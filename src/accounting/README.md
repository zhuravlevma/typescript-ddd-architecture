# Accounting bounded context

Accounting contains two subdomains:

- Reports: Core

  [Domain model](https://martinfowler.com/eaaCatalog/domainModel.html) with a clean architecture with ports and adapters. It takes into account some tactical patterns from DDD.

  <img src='https://github.com/zhuravlevma/nestjs-ddd-clean-architecture/assets/44276887/2be14dbf-818b-452d-a39e-0a9de80c9a6b' width='50%'>

- Verification: Supporting

  [Active Record](https://www.martinfowler.com/eaaCatalog/activeRecord.html) uses the most obvious approach, putting data access logic in the domain object.

  <img src='https://github.com/zhuravlevma/nestjs-ddd-architecture/assets/44276887/5debb30e-91df-44c6-abf0-e82d4442d0b9' width='50%'>
