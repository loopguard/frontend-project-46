install: install-deps
	npx simple-git-hooks

run:
	bin/nodejs-package.js 10

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

install:
	npm ci

publish:
	npm publish --dry-run

link:
	npm link

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	npm test -s -- --coverage functions.test.js
