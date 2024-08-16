import { App } from 'supertest/types'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import timekeeper from 'timekeeper'

import { AppModule } from '@/app.module'

describe('GET /tasks', () => {
  let app: INestApplication

  beforeEach(async () => {
    timekeeper.freeze(new Date('2025-01-01T00:00:00.000Z'))
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterEach(() => {
    timekeeper.reset()
  })

  it('returns tasks by createdAt descending', async () => {
    const results = await request(app.getHttpServer() as App)
      .get('/tasks')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
    expect(results.body).toStrictEqual({
      data: expect.any(Array),
      meta: {
        total: 1,
        limit: 50,
        offset: 0,
      },
    })
    expect(results.body.data[0]).toStrictEqual({
      id: expect.any(String),
      title: 'Pickup groceries',
      isDone: false,
      completedAt: null,
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
      deletedAt: null,
    })
  })
})
