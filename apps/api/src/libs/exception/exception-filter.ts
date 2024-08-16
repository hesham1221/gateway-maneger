import { Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter {
  private response = {
    code: 500,
    success: false,
    message: 'Something went wrong!',
  };
  private readonly logger: Logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const httpCtx = host.switchToHttp();
    const response = httpCtx.getResponse();
    if (exception instanceof HttpException) {
      return this.handleHttpException(exception);
    } else {
      return this.handleGenericError(exception, host);
    }
    // response.status(this.response.code).json(this.response);
    // return this.response;
  }

  private handleHttpException(exception: HttpException) {
    const messageKey = exception.getResponse()['message']
      ? Array.isArray(exception.getResponse()['message'])
        ? exception.getResponse()['message'][0]
        : exception.getResponse()['message']
      : exception.message;
    this.logHttpException(exception);
    this.response.code = exception.getStatus();
    this.response.message = messageKey;
    return this.response;
  }

  private logHttpException(exception: HttpException): void {
    this.logger.error(`Message: ${exception.message}`);
  }

  private handleGenericError(exception: any, host: ArgumentsHost) {
    this.response.code = 500;
    this.response.message = 'Something went wrong!';
    this.logError(`Message: ${exception.message}`, exception);
    const httpCtx = host.switchToHttp();
    const response = httpCtx.getResponse();
    const responseMessage = exception.message.includes(
      'no such file or directory'
    )
      ? 'File not found'
      : 'Something went wrong!';
    response.end(responseMessage);
    return this.response;
  }

  private logError(message: string, error: unknown): void {
    this.logger.error(message, error);
  }
}
