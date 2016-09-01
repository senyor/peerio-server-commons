REPORTER = spec
UNIT_TESTS = test/*.js

unittest:
	for i in $(UNIT_TESTS); \
	do \
	    ./node_modules/.bin/mocha --reporter $(REPORTER) $$i; \
	done

shrinkpack:
	if ! test -d node_modules; then \
	    npm install; \
	fi; \
	if ! test -x /usr/local/bin/shrinkpack -o -x /usr/bin/shrinkpack; then \
	    npm install -g shrinkwrap; \
	    npm install -g shrinkpack; \
	fi; \
	if npm shrinkwrap --dev; then \
	    shrinkpack; \
        fi

shrinkwrap: shrinkpack
