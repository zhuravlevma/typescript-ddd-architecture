# Clean Architecture with DDD

[Domain model](https://martinfowler.com/eaaCatalog/domainModel.html) with a clean architecture with ports and adapters. It takes into account some tactical patterns from DDD.

## Domains And Subdomains

### Marketplace Domain

**Bounded Contexts:**

- **`Warehouse`** - Context for warehouse operations

  - **Subdomains:** -
    - **`Core OrderManagement`** - order management at the warehouse
    - **`Supporting Location`** - management of product locations at the warehouse, product categorization

- **`Accounting`** - accounting context
  - **`Core Subdomain.Reports`** - financial reports generation
  - **`Supporting Subdomain.Verification`** - order verification and invoicing
- **`Delivery`** - delivery context
  - **`Core Subdomain.Board`** - board of order proposals
  - **`Core Subdomain.Couriers`** - management of couriers
  - **`Supporting Subdomain.Tracking`** - delivery status tracking

## Architecture inside Core subdomains

![image](https://github.com/zhuravlevma/nestjs-ddd-clean-architecture/assets/44276887/2be14dbf-818b-452d-a39e-0a9de80c9a6b)

### Module boundaries

If you have a large monolith that contains many [bounded contexts](https://martinfowler.com/bliki/BoundedContext.html), then the service can be divided into modules by context.

If you have a micro service architecture and you prefer to allocate contexts to different services (which is preferable). If it's not enough for you, then you can also divide subdomains into services.
Each Core subdomain can be divided into modules by [aggregates](https://martinfowler.com/bliki/DDD_Aggregate.html).

### Why do I need an event bus?

Firstly, we have a limitation - this is the change of one aggregate in one transaction (strong consistency). To change multiple aggregates at the same time, you need to use eventual consistency.

### Why do I need Relay?

We cannot write a message directly to the broker, because it may not be available. Pattern [Transactional outbox](https://microservices.io/patterns/data/transactional-outbox.html).

Transactional outbox can be done using synchronous calls, the broker is not biased. But this option is more suitable for point-to-point communication.

In a good way, each bounded context in a micro-service architecture should have its own Relay. In the demonstration monolith, I decided to limit myself to one.

### Important

This is not a production ready solution. For example, Event Emitter needs to be replaced with a separate message broker that [supports retry with confirmation](https://medium.com/upstream-engineering/a-tale-of-retries-using-rabbitmq-8a02a357a66).

### Event Storming schema

![image](https://github.com/zhuravlevma/nestjs-clean-architecture/assets/44276887/396d6ec0-bc43-4cf3-9dec-a77625f2fd11)

## Installation

```bash
npm install
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

# arch tests
$ npm run test:arch

# test coverage
$ npm run test:cov
```
