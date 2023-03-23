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
