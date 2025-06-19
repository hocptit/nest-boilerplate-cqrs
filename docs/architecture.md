# NestJS CQRS Boilerplate Architecture

## Overview

This project implements a **Command Query Responsibility Segregation (CQRS)** pattern combined with **Domain-Driven Design (DDD)** principles using NestJS framework. The architecture promotes separation of concerns, scalability, and maintainability.

## Architecture Patterns

### CQRS (Command Query Responsibility Segregation)

CQRS separates read and write operations into different models:

- **Commands**: Handle write operations (Create, Update, Delete)
- **Queries**: Handle read operations (Get, List, Search)
- **Events**: Handle side effects and cross-cutting concerns

### DDD (Domain-Driven Design)

The project follows DDD principles:

- **Domain Models**: Core business entities and value objects
- **Repositories**: Data access abstraction
- **Services**: Business logic coordination
- **Aggregates**: Consistency boundaries

## Project Structure

```
src/
├── config/                 # Configuration modules and settings
├── constants/              # Application constants
├── infra/                  # Infrastructure concerns (middleware, pipes, etc.)
├── modules/                # Feature modules
│   └── article/           # Article domain module
│       ├── controllers/   # HTTP controllers (separated by commands/queries)
│       ├── cqrs/         # CQRS implementation
│       │   ├── commands/ # Command handlers
│       │   ├── queries/  # Query handlers
│       │   ├── events/   # Event handlers
│       │   └── sagas/    # Process managers
│       ├── domain/       # Domain models and business logic
│       ├── dtos/         # Data transfer objects
│       ├── mappers/      # Domain-DTO mapping
│       └── services/     # Application services
└── shared/               # Shared utilities and base classes
    ├── cqrs/            # Base CQRS classes
    ├── services/        # Base service classes
    └── ...
```

## Key Components

### Controllers

Controllers are separated by responsibility:

- **Command Controllers**: Handle write operations
- **Query Controllers**: Handle read operations

```typescript
@Controller('articles')
export class ArticleCommandsController {
  @Post()
  async createArticle(@Body() dto: CreateArticleDto) {
    return this.articlesService.createArticle(dto);
  }
}
```

### Services

Services coordinate between controllers and CQRS handlers:

```typescript
@Injectable()
export class ArticlesService extends BaseService {
  async createArticle(dto: CreateArticleDto): Promise<BaseResponseCommand> {
    const id = await this.executeCommand<AggregateID, Error>(
      new CreateArticleCommand(dto),
    );
    return { id };
  }
}
```

### Command Handlers

Handle write operations and business logic:

```typescript
@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler implements ICommandHandler<CreateArticleCommand> {
  async execute(command: CreateArticleCommand): Promise<Result<string, Error>> {
    // Business logic implementation
  }
}
```

### Query Handlers

Handle read operations and data retrieval:

```typescript
@QueryHandler(FindManyArticlesQuery)
export class FindManyArticlesHandler implements IQueryHandler<FindManyArticlesQuery> {
  async execute(query: FindManyArticlesQuery): Promise<Result<ArticleDocument[], Error>> {
    // Query implementation
  }
}
```

## Error Handling

The application uses functional error handling with the `oxide.ts` library:

- **Result Type**: Explicit error handling without exceptions
- **Domain Errors**: Custom error types for business logic violations
- **Error Transformation**: Convert domain errors to HTTP exceptions

```typescript
const result: Result<ArticleDocument, Error> = await this.queryBus.execute(query);
return match(result, {
  Ok: (article) => article,
  Err: (error) => {
    if (error instanceof DomainError) {
      throw new BadRequestException({ message: error.message });
    }
    throw error;
  },
});
```

## Data Flow

### Command Flow
1. HTTP Request → Controller
2. Controller → Service
3. Service → Command Bus
4. Command Bus → Command Handler
5. Command Handler → Repository/Domain
6. Response ← Controller

### Query Flow
1. HTTP Request → Controller
2. Controller → Service
3. Service → Query Bus
4. Query Bus → Query Handler
5. Query Handler → Repository
6. Response ← Controller

## Configuration Management

Configuration is centralized and typed:

```typescript
export interface AppConfig {
  port: number;
  apiPrefix: string;
  environment: string;
  // ... other config properties
}
```

## Validation

Input validation is handled at multiple levels:

- **DTO Validation**: Using class-validator decorators
- **Domain Validation**: Business rule validation in domain models
- **Schema Validation**: Database schema constraints

## Testing Strategy

The architecture supports comprehensive testing:

- **Unit Tests**: Individual components (handlers, services)
- **Integration Tests**: CQRS flow testing
- **E2E Tests**: Full application flow

## Best Practices

### 1. Separation of Concerns
- Commands and queries are separated
- Controllers only handle HTTP concerns
- Business logic is in domain models and handlers

### 2. Explicit Error Handling
- Use Result types for explicit error handling
- Convert domain errors to appropriate HTTP responses
- Avoid throwing exceptions in business logic

### 3. Type Safety
- Strong TypeScript typing throughout
- Typed configuration objects
- Generic base classes for reusability

### 4. Documentation
- Comprehensive JSDoc comments
- API documentation with Swagger
- Architecture documentation (this file)

## Scalability Considerations

### Horizontal Scaling
- Stateless services enable horizontal scaling
- CQRS allows independent scaling of read/write operations
- Event-driven architecture supports distributed systems

### Performance
- Query optimization through dedicated query handlers
- Caching strategies can be implemented at query level
- Database read replicas for query operations

### Maintainability
- Clear separation of concerns
- Consistent patterns across modules
- Comprehensive documentation and typing

## Future Enhancements

1. **Event Sourcing**: Store events as the source of truth
2. **Microservices**: Extract modules into separate services
3. **Caching**: Implement Redis caching for queries
4. **Authentication**: Add JWT-based authentication
5. **Monitoring**: Add comprehensive logging and metrics
