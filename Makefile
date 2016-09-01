REPORTER = spec
UNIT_TESTS = test/*.js

unittest:
	for i in $(UNIT_TESTS); \
	do \
	    ./node_modules/.bin/mocha --reporter $(REPORTER) $$i; \
	done
