## Description

[Domain model](https://martinfowler.com/eaaCatalog/domainModel.html) with a clean architecture with ports and adapters. It takes into account some tactical patterns from DDD.

```mermaid
  flowchart TD



	subgraph module1[module]
		subgraph web1[web]
			controllers1[controllers] -- uses --> dtos1[dtos]
		end

		subgraph domain1[domain]
			services1[services] -- uses --> entities1[entities]
		end

		subgraph dal1[dal]
			repositories1[services] -- uses --> mappers1[mappers]
		end
	end
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
