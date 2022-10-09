import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Module,
  Provider,
  ValidationError,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common'
import { APP_FILTER, APP_PIPE } from '@nestjs/core'
import { Response } from 'express'
import { MysqlModule } from './connection/mysql/mysql.module'
import { RedisModule } from './connection/redis/redis.module'
import { DevController } from './dev/dev.controller'
import { DevService } from './dev/dev.service'
import { ESMModule } from './esm.module'

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(e: Error, host: ArgumentsHost): void {
    // errorHandler(exception)

    console.log(e)

    let status = 200
    let resp
    if (e instanceof HttpException) {
      status = e.getStatus()
      resp = { error: 'http exception', detail: e.message }
    } else if (e instanceof ValidateError) {
      status = 400
      resp = { error: 'validate error', detail: e.message }
    } else {
      status = 500
      resp = { error: 'other error' }
    }

    host.switchToHttp().getResponse<Response>().status(status).json(resp).end()
  }
}

export class ValidateError extends Error {
  constructor(e: ValidationError[]) {
    super()
    this.name = 'CustomError'
    this.message = e[0].toString()
  }
}

const apiValidationPipe: Provider = {
  provide: APP_PIPE,
  useFactory: () => {
    const options: ValidationPipeOptions = {
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }

    options.exceptionFactory = (e) => new ValidateError(e)

    return new ValidationPipe(options)
  },
}

@Module({
  imports: [MysqlModule, RedisModule, ESMModule],
  controllers: [DevController],
  providers: [
    DevService,
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter,
    },
    apiValidationPipe,
  ],
})
export class ApiModule {}
