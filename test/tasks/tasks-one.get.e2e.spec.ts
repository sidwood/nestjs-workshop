import { App } from 'supertest/types'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import timekeeper from 'timekeeper'

import { AppModule } from '@/app.module'

const given = describe

describe('GET /tasks/:id', () => {
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

  given('the task exists', () => {
    it('returns task by id', async () => {
      const results = await request(app.getHttpServer() as App)
        .get('/tasks/abc123')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
      expect(results.body).toStrictEqual({
        data: {
          id: expect.any(String),
          title: 'Pickup groceries',
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

  given('the task does not exist', () => {
    it('returns 404 "Not Found"', async () => {
      const results = await request(app.getHttpServer() as App)
        .get('/tasks/whatever')
        .expect(404)
      expect(results.body).toStrictEqual({
        statusCode: 404,
        error: 'Not Found',
        message: 'Task not found',
      })
    })
  })
})
