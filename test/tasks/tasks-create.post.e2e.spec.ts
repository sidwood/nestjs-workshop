import { App } from 'supertest/types'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import timekeeper from 'timekeeper'

import { AppModule } from '@/app.module'

describe('POST /tasks', () => {
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

  it('creates a new task', async () => {
    const results = await request(app.getHttpServer() as App)
      .post('/tasks')
      .send({
        title: 'School pickup @ 3pm',
      })
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
    expect(results.body).toStrictEqual({
      data: {
        id: expect.any(String),
        title: 'School pickup @ 3pm',
        isDone: false,
        completedAt: null,
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
        deletedAt: null,
      },
      meta: {},
    })
  })
})
