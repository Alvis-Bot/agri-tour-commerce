import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiException } from './api.exception';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const { getResponse } = host.switchToHttp();
    const response: Response = getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    console.log(exception);

    if (exception instanceof ApiException) {
      response.status(status).json({
        code: exception.getStatus(),
        message: exception.message,
      });
    } else if (exception instanceof BadRequestException) {
      response.status(status).json({
        code: exception.getStatus(),
        message: exception.getResponse()['message'],
      });
    } else {
      response.status(status).json({
        code: exception.getStatus(),
        message: exception.message,
      });
    }
  }
}
