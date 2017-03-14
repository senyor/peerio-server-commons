/* eslint-disable */
'use strict';

const Q = require('q');
const stream = require('stream');

function ofTypes(obj, ...types) {
    return types.reduce((rslt, type) => rslt || obj instanceof type, false);
}

function isStream(obj) {
    return ofTypes(obj, stream.Readable, stream.Duplex, stream.Transform, stream.Stream);
}

class MultiStream extends stream.Readable {
    constructor() {
        super();
        this._reading = false;
        this._sources = [];
        this._currentSource = null;
        this._sourceDataAvailable = false;
        this._wantData = false;
    }

    append(source, options) {
        if (!ofTypes(source, stream.Readable, stream.Duplex, stream.Transform, stream.Stream, Buffer, Function)) {
            throw new Error("Invalid source");
        }
        this._sources.push [source, options];
        return this;
    }

    ensureReading() {
        if(this._reading) {
            return Q();
        }
        return this._initiateRead();
    }

    _initiateRead() {
        this._reading = true;
        this._resolveAllSources().then(actualSources => {
            this._sources = actualSources;
        })
    }

    _resolveAllSources(){
        return Q.all(
            this._sources.map(source => this._resolveSource(source))
        )
    }

    _resolveSource(source) {
        return Q.Promise((resolve, reject) => {
            if (source[0] instanceof Function) {
                source[0](realSource => {
                    resolve([realSource, source[1]]); // ???????
                });
            } else {
                resolve(source);
            }
        })
    }

    _read(size) {
        this.ensureReading().then(() => this._doRead(size));
    }

    _doRead(size) {
        const p = this._currentSource ? Q() : this._nextSource(size);
        p.then(() => this._doActualRead(size))
    }

    _nextSource(readSize) {
        if (this._sources.length === 0) {
            this.push(null);
            return;
        }
        this._currentSource = this._sources.shift()[0];
        this._currentIsStream = isStream(this._currentSource);
        if (this._currentIsStream) {
            this._currentSource.once("end", () => {
                this._currentSource = null;
                return this._doRead(readSize);
            });
            this._currentSource.on("readable", () => {
                this._sourceDataAvailable = true;
                if (this._wantData) {
                    return this._doStreamRead();
                }
            });
        }
        return Q();
    }

    _doActualRead(size) {
        return Q.Promise((resolve, reject) => {
            if (this._currentIsStream) {
                if (this._sourceDataAvailable) {
                    this._doStreamRead();
                    return resolve();
                } else {
                    this._wantData = true;
                    return resolve();
                }
            } else {
                const chunk = this._currentSource;
                this._currentSource = null;
                if (chunk !== null) {
                    this.push(chunk);
                } else {
                    this.push(Buffer.from(''));
                }
                return resolve();
            }
        })
    }



    _doStreamRead() {
        this._sourceDataAvailable = false;
        this._wantData = false;
        const chunk = this._currentSource.read();
        if (chunk != null) {
            this.push(chunk);
        }
        return Q();
    }
}
