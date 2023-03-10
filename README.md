
## Documentation [read here](https://sotatek.notion.site/nest-cqrs-boilerplate-d3837f47619c44bbb4e680824aa9f665)
## Overview


aggregate => aggregate
document => ORM, map db
repository => using => Document => aggregate (using toDomain)


Command:
  Command → Event → Command.
Entities:
  Contain Domain business logic. Avoid having business logic in your services when possible
Event:
  Event is async
Only throw error in server or controller


## Stay in touch

- Author - nguyenthaihoc.dev@gmail.com

