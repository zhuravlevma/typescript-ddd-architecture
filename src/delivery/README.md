# Delivery bounded context

Delivery contains aggregates: deliveryman, offer.

Each aggregate is isolated and has a clear and simple interface.

General is needed to use entities from a variety of aggregates, but without the possibility of changing them. Queries only.
