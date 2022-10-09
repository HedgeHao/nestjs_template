import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { deepStrictEqual } from 'assert'
import request from 'supertest'
import { ApiModule } from '../app.module'

context(__filename, () => {
  let app: INestApplication
  let module: TestingModule

  before(async () => {
    module = await Test.createTestingModule({ imports: [ApiModule] }).compile()

    app = module.createNestApplication()
    await app.init()
  })

  after(async () => {
    await module.close()
  })

  it('Get Dev', async () => {
    const server = app.getHttpServer()
    const resp = await request(server).get('/dev?name=Josh')

    deepStrictEqual(resp.body, {
      info: '',
      code: 200,
      detail: { greeting: 'Hi Josh' },
    })
  })
})
