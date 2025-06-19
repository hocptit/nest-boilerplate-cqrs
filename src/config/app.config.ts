import { registerAs } from '@nestjs/config';

/**
 * Application configuration interface defining the structure of app-specific settings.
 *
 * @interface AppConfig
 */
export interface AppConfig {
  /** The port number on which the application will listen */
  port: number;
  /** The global API prefix for all routes */
  apiPrefix: string;
  /** The environment in which the application is running */
  environment: string;
  /** Whether CORS is enabled */
  corsEnabled: boolean;
  /** The base URL of the application */
  baseUrl: string;
  /** Static assets configuration */
  assets: {
    /** The path to serve static assets from */
    path: string;
    /** The URL prefix for static assets */
    prefix: string;
  };
  /** Swagger documentation configuration */
  swagger: {
    /** Whether Swagger is enabled */
    enabled: boolean;
    /** The path where Swagger documentation is served */
    path: string;
    /** The title of the API documentation */
    title: string;
    /** The description of the API */
    description: string;
    /** The version of the API */
    version: string;
  };
}

/**
 * Application configuration factory function.
 * Reads environment variables and returns a typed configuration object.
 *
 * @returns {AppConfig} The application configuration object
 */
export default registerAs(
  'app',
  (): AppConfig => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    apiPrefix: process.env.API_PREFIX || 'api',
    environment: process.env.NODE_ENV || 'development',
    corsEnabled: process.env.CORS_ENABLED !== 'false',
    baseUrl:
      process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
    assets: {
      path: process.env.ASSETS_PATH || 'assets',
      prefix: process.env.ASSETS_PREFIX || '/assets',
    },
    swagger: {
      enabled: process.env.SWAGGER_ENABLED !== 'false',
      path: process.env.SWAGGER_PATH || 'api-docs',
      title: process.env.SWAGGER_TITLE || 'NestJS CQRS Boilerplate API',
      description:
        process.env.SWAGGER_DESCRIPTION ||
        'A NestJS boilerplate implementing CQRS and DDD patterns',
      version: process.env.SWAGGER_VERSION || '1.0.0',
    },
  }),
);

/**
 * Type helper to get the app configuration from the ConfigService.
 *
 * @example
 * const appConfig = this.configService.get<AppConfig>('app');
 */
export type AppConfigType = AppConfig;
