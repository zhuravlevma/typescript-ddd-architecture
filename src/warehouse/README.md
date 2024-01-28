# Warehouse bounded context

Warehouse contains two subdomains:

- **`OrderManagment: Core`**

  [Domain model](https://martinfowler.com/eaaCatalog/domainModel.html) with a clean architecture with ports and adapters. It takes into account some tactical patterns from DDD.

  <img src='https://github.com/zhuravlevma/nestjs-ddd-clean-architecture/assets/44276887/2be14dbf-818b-452d-a39e-0a9de80c9a6b' alt="domain model schema" width='50%'>

- **`Location: Supporting`**

  [Transaction Script](https://martinfowler.com/eaaCatalog/transactionScript.html) organizes business logic by procedures where each procedure handles a single request from the presentation.

  <img src='https://github.com/zhuravlevma/nestjs-ddd-architecture/assets/44276887/29971154-b39a-4650-b9fb-b867c5321483' alt="transaction script schema" width='50%'>
