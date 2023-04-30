## Description

[Domain model](https://martinfowler.com/eaaCatalog/domainModel.html) with a clean architecture with ports and adapters. It takes into account some tactical patterns from DDD.

1. The system is divided into modules, each module is a separate piece of the system. The module is divided into an infrastructure part and a domain part

```mermaid
  flowchart TD
    subgraph delivery-module
	domain
	infrastucture
	end
```

2. Inside, the domain folder is divided into aggregates. Aggregates are a collection of entities. Each aggregate has a root. All interaction with entities must occur through the root.

```mermaid
  flowchart TD
	delivery-module --> domain
    subgraph domain
	accounting-order-aggregate
	deliveryman-aggregate
	end
```

```mermaid
  flowchart TD

    subgraph infrastructure
    subgraph web
    controllers -- uses -->dtos-framework
    end
    subgraph data access layer
    repositories -- uses --> mappers
    end
    end
    subgraph domain
    subgraph aggregate#1

    services1(services) -- uses --> entities1(entities)
    services1(services) -- uses --> ports1(ports)
    services1(services) -- uses --> plain-dto1(dto)
    end

    subgraph aggregate#2

    services2(services) -- uses --> entities2(entities)
    services2(services) -- uses --> ports2(ports)
    services2(services) -- uses --> plain-dto2(dto)
    end
    end

    infrastructure -- use interfaces from domain --> aggregate#2
    infrastructure -- use interfaces from domain --> aggregate#1
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
