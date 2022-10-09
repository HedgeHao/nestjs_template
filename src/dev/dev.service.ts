import { Inject } from '@nestjs/common'
import { RedisService } from '../connection/redis/redis.service'
import { ESMService } from '../esm.module'

export class DevService {
  constructor(
    @Inject(RedisService)
    private readonly redisService: RedisService,
    @Inject(ESMService)
    private readonly esmModule: ESMService,
  ) {}

  async sayHi(name: string): Promise<string> {
    const resp = await this.esmModule.got.get('http://google.com.tw')
    console.log(resp.statusCode)
    return `Hi ${name}`
  }

  async redisDemo(): Promise<string> {
    const redis = this.redisService.getClient()
    await redis.set('test', Date.now())
    return await redis.get('test')
  }
}
