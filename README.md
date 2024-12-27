# DDD patterns with examples

## Marketplace Domain

### Event Storming schema

![image](https://github.com/zhuravlevma/nestjs-ddd-architecture/assets/44276887/bb18f714-0bbf-4109-a638-976352e5eab7)

### Describe

**Bounded Contexts:**

- **`Warehouse`** - Context for warehouse operations

  - **Subdomains:** -
    - **`Core OrderManagement`** - order management at the warehouse
    - **`Supporting Location`** - management of product locations at the warehouse, product categorization

- **`Accounting`** - accounting context
  - **Subdomains:** -
    - **`Core Reports`** - financial reports generation
    - **`Supporting Verification`** - order verification
- **`Delivery`** - delivery context
  - **Subdomains:** -
    - **`Core Board`** - board of order proposals
    - **`Core Couriers`** - management of couriers
    - **`Supporting Tracking`** - delivery status tracking

### Module boundaries

This project is a large monolith structured at a high level into [bounded contexts](https://martinfowler.com/bliki/BoundedContext.html). Each context contains subdomains that, depending on the type, implement their architectural pattern. For the **`Core subdomain`**, a [Domain model](https://martinfowler.com/eaaCatalog/domainModel.html) is chosen, while for the **`Supporting subdomain`**, either [Transaction script](https://martinfowler.com/eaaCatalog/transactionScript.html) or [Active Record](https://www.martinfowler.com/eaaCatalog/activeRecord.html) is implemented as its architectural pattern.

- **`Domain model: Core`**

  [Domain model](https://martinfowler.com/eaaCatalog/domainModel.html) with a clean architecture with ports and adapters. It takes into account some tactical patterns from DDD.

  <img src='https://github.com/zhuravlevma/nestjs-ddd-clean-architecture/assets/44276887/2be14dbf-818b-452d-a39e-0a9de80c9a6b' alt="domain model schema" width='50%'>

- **`Active Record: Generic/Supporting`**

  [Active Record](https://www.martinfowler.com/eaaCatalog/activeRecord.html) uses the most obvious approach, putting data access logic in the domain object.

  <img src='https://github.com/zhuravlevma/nestjs-ddd-architecture/assets/44276887/5debb30e-91df-44c6-abf0-e82d4442d0b9' alt="active record schema" width='50%'>

- **`Transaction Script: Generic/Supporting`**

  [Transaction Script](https://martinfowler.com/eaaCatalog/transactionScript.html) organizes business logic by procedures where each procedure handles a single request from the presentation.

  <img src='https://github.com/zhuravlevma/nestjs-ddd-architecture/assets/44276887/29971154-b39a-4650-b9fb-b867c5321483' alt="transaction script schema" width='50%'>

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

This is not a production ready solution!

### ArchUnit

Utilities for convenient architectural testing (similar to [ArchUnit in Java](https://www.archunit.org/)) have been developed for the project. They can be executed using the command:

```bash
npm run test:arch
```

## Installation

```bash
npm install
```

## Running the app (local)

```sql
CREATE SCHEMA IF NOT EXISTS accounting
CREATE SCHEMA IF NOT EXISTS warehouse
CREATE SCHEMA IF NOT EXISTS delivery
CREATE SCHEMA IF NOT EXISTS public
```

```bash
cp .env.example .env
```

```bash
npm install
```

```bash
npm install dotenv-cli
```

```bash
dotenv npm run start:dev
```

## Running the app (docker)

```bash
cp .env.example .env
```

```bash
docker-compose up
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
