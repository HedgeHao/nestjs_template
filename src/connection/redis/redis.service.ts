import { Logger } from '@nestjs/common'
import Redis from 'ioredis'
import RedisMock from 'ioredis-mock'
import { Config } from '../../config'

export class RedisService {
  private readonly _client: Redis
  private readonly _logger = new Logger(RedisService.name)

  constructor() {
    this._client =
      Config.MODE === 'test'
        ? new RedisMock()
        : new Redis({
            host: Config.REDIS_HOST,
            port: Config.REDIS_PORT,
            password: Config.REDIS_PASSWORD,
            retryStrategy(times) {
              return 50 * Math.pow(2, times)
            },
          })
            .once('ready', () => {
              this._logger.log('redis connection is ready')
            })
            .on('reconnecting', () => {
              this._logger.warn('reconnect to redis server')
            })
    // .on('error', errorHandler);
  }

  getClient(): Redis {
    return this._client
  }

  /** set lock before task to prevent race condition */
  preempt(key: string, timeout: number, value?: string | number) {
    return this._client.set(key, value || 1, 'EX', timeout, 'NX')
  }
}
