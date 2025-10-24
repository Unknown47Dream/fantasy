import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
} from '@prisma/client/runtime/library';

type PrismaException =
  | PrismaClientKnownRequestError
  | PrismaClientUnknownRequestError
  | PrismaClientValidationError
  | PrismaClientInitializationError
  | PrismaClientRustPanicError;

@Catch(
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: PrismaException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    this.logger.error(
      `Error at ${request.url}: ${exception.message}`,
      exception.stack,
    );

    if (exception instanceof PrismaClientKnownRequestError) {
      const result = this.handleKnownRequestError(exception);
      status = result.status;
      message = result.message;
    } else if (exception instanceof PrismaClientUnknownRequestError) {
      status = HttpStatus.BAD_REQUEST;
      message = `Unknown Prisma request error: ${this.cleanMessage(exception.message)}`;
    } else if (exception instanceof PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = `Validation error: ${this.cleanMessage(exception.message)}`;
    } else if (exception instanceof PrismaClientInitializationError) {
      status = HttpStatus.SERVICE_UNAVAILABLE;
      message = `Database connection error: ${this.cleanMessage(exception.message)}`;
    } else if (exception instanceof PrismaClientRustPanicError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = `Critical database engine error: ${this.cleanMessage(exception.message)}`;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }

  private handleKnownRequestError(exception: PrismaClientKnownRequestError): {
    status: HttpStatus;
    message: string;
  } {
    const meta = exception.meta;

    switch (exception.code) {
      case 'P2000':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: `Value too long for column: ${this.getMetaValue(meta, 'column_name')}`,
        };
      case 'P2001':
        return {
          status: HttpStatus.NOT_FOUND,
          message: `Record not found where ${this.getMetaValue(meta, 'model_name')}`,
        };
      case 'P2002':
        return {
          status: HttpStatus.CONFLICT,
          message: `Unique constraint failed on: ${this.getMetaValue(meta, 'target')}`,
        };
      case 'P2003':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: `Foreign key constraint failed on field: ${this.getMetaValue(meta, 'field_name')}`,
        };
      case 'P2004':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: `Constraint failed on the database`,
        };
      case 'P2005':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: `Invalid value stored in database: ${this.getMetaValue(meta, 'field_value')}`,
        };
      case 'P2006':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: `Invalid value provided: ${this.getMetaValue(meta, 'field_value')}`,
        };
      case 'P2007':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: `Data validation error: ${this.getMetaValue(meta, 'database_error')}`,
        };
      case 'P2008':
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Failed to parse query`,
        };
      case 'P2009':
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Failed to validate query`,
        };
      case 'P2010':
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Raw query failed`,
        };
      case 'P2011':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: `Null constraint violation on: ${this.getMetaValue(meta, 'constraint')}`,
        };
      case 'P2012':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: `Missing required value`,
        };
      case 'P2013':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: `Missing required argument: ${this.getMetaValue(meta, 'argument_name')}`,
        };
      case 'P2014':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: `Required relation violation: ${this.getMetaValue(meta, 'relation_name')}`,
        };
      case 'P2015':
        return {
          status: HttpStatus.NOT_FOUND,
          message: `Related record not found: ${this.getMetaValue(meta, 'model_name')}`,
        };
      case 'P2016':
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Query interpretation error`,
        };
      case 'P2017':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: `Records for relation not connected: ${this.getMetaValue(meta, 'relation_name')}`,
        };
      case 'P2018':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: `Required connected records not found: ${this.getMetaValue(meta, 'relation_name')}`,
        };
      case 'P2019':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: `Input error`,
        };
      case 'P2020':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: `Value out of range for type`,
        };
      case 'P2021':
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Table does not exist: ${this.getMetaValue(meta, 'table')}`,
        };
      case 'P2022':
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Column does not exist: ${this.getMetaValue(meta, 'column')}`,
        };
      case 'P2023':
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Inconsistent column data`,
        };
      case 'P2024':
        return {
          status: HttpStatus.REQUEST_TIMEOUT,
          message: `Connection pool timeout`,
        };
      case 'P2025':
        return {
          status: HttpStatus.NOT_FOUND,
          message: `Record to delete does not exist`,
        };
      case 'P2026':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: `Unsupported feature for current database provider`,
        };
      case 'P2027':
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Multiple database errors occurred during query execution`,
        };
      case 'P2028':
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Transaction API error`,
        };
      case 'P2030':
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Cannot find fulltext index`,
        };
      case 'P2033':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: `Number out of range`,
        };
      case 'P2034':
        return {
          status: HttpStatus.CONFLICT,
          message: `Write conflict detected`,
        };
      default:
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: `Database error [${exception.code}]: ${this.cleanMessage(exception.message)}`,
        };
    }
  }

  private getMetaValue(
    meta: Record<string, unknown> | undefined,
    key: string,
  ): string {
    if (!meta || !(key in meta)) {
      return 'unknown';
    }
    const value = meta[key];
    if (typeof value === 'string') {
      return value;
    }
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (value && typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  }

  private cleanMessage(message: string): string {
    return message.replace(/\n/g, ' ').trim();
  }
}
