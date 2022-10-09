import { Test, TestingModule } from '@nestjs/testing'
import { deepStrictEqual } from 'assert'
import { restore, stub } from 'sinon'
import { MysqlModule } from '../connection/mysql/mysql.module'
import { RedisModule } from '../connection/redis/redis.module'
import { ESMModule } from '../esm.module'
import { DevService } from './dev.service'

context(__filename, () => {
  let module: TestingModule

  before(async () => {
    module = await Test.createTestingModule({
      imports: [MysqlModule, RedisModule, ESMModule],
      providers: [DevService],
    }).compile()

    stub(Date, 'now').returns(1615996800000)
  })

  after(async () => {
    restore()
  })

  it('Test Post Dev', async () => {
    const service = module.get(DevService)

    const ts = await service.redisDemo()

    deepStrictEqual(ts, '1615996800000')
  })
})
