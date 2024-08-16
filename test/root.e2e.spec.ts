import { App } from 'supertest/types'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '@/app.module'

describe('GET /', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('returns a greeting', async () => {
    const results = await request(app.getHttpServer() as App)
      .get('/')
      .expect(200)
      .expect({ message: 'Hello Expana!' })
    expect(results.body).toStrictEqual({ message: 'Hello Expana!' })
  })
})
