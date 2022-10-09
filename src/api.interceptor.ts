import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { formatAppResponse } from './api.response'

export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(map((detail) => formatAppResponse({ detail })))
  }
}
