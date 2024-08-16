import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseMappingInterceptor<T> implements NestInterceptor<T, unknown> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<{
    data: unknown;
    code: number;
    success: boolean;
    message: string;
  }> {
    return next.handle().pipe(
      map((data) => {
        return {
          data: data,
          code: 200,
          success: true,
          message: 'Request successful',
        };
      })
    );
  }
}
