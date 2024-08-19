import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import timekeeper from 'timekeeper'

import { TasksDataService } from './tasks-data.service'
import { Task } from '@/tasks/entities/task.entity'

const given = describe

describe('TasksDataService', () => {
  let service: TasksDataService
  let tasks: Task[]

  beforeEach(async () => {
    timekeeper.freeze(new Date('2025-01-01T00:00:00.000Z'))
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksDataService],
    }).compile()
    service = module.get<TasksDataService>(TasksDataService)
    tasks = []
    service.tasks = tasks
  })

  afterEach(() => {
    timekeeper.reset()
  })

  describe('#create()', () => {
    it('creates a new task', () => {
      const createTaskDto = { title: 'Test Task' }
      const result = service.create(createTaskDto)
      expect(tasks).toContainEqual(result)
      expect(result).toStrictEqual({
        id: expect.any(String),
        title: 'Test Task',
        isDone: false,
        completedAt: null,
        createdAt: new Date('2025-01-01T00:00:00.000Z'),
        updatedAt: new Date('2025-01-01T00:00:00.000Z'),
        deletedAt: null,
      })
    })
  })

  describe('#update()', () => {
    given('the task exists', () => {
      beforeEach(() => {
        const task = generateTask({
          id: 'abc123',
          title: 'Test Task',
          isDone: false,
        })
        tasks.push(task)
      })

      it('updates task', () => {
        timekeeper.freeze(new Date('2026-12-01T00:00:00.000Z'))
        const updateTaskDto = { title: 'Updated Task' }
        const result = service.update('abc123', updateTaskDto)
        expect(result).toStrictEqual({
          id: expect.any(String),
          title: 'Updated Task',
          isDone: false,
          completedAt: null,
          createdAt: new Date('2025-01-01T00:00:00.000Z'),
          updatedAt: new Date('2026-12-01T00:00:00.000Z'),
          deletedAt: null,
        })
      })

      it('timestamps completed task', () => {
        timekeeper.freeze(new Date('2026-12-01T00:00:00.000Z'))
        const updateTaskDto = { title: 'Updated Task', isDone: true }
        const result = service.update('abc123', updateTaskDto)
        expect(result).toStrictEqual({
          id: expect.any(String),
          title: 'Updated Task',
          isDone: true,
          completedAt: new Date('2026-12-01T00:00:00.000Z'),
          createdAt: new Date('2025-01-01T00:00:00.000Z'),
          updatedAt: new Date('2026-12-01T00:00:00.000Z'),
          deletedAt: null,
        })
      })
    })

    given("task doesn't exist", () => {
      it('throws NotFoundException', () => {
        expect(() => {
          service.update('abc123', { title: 'Updated Task' })
        }).toThrow(NotFoundException)
      })
    })
  })

  describe('#remove()', () => {
    it('soft deletes task', () => {
      const task = generateTask({
        id: 'abc123',
        title: 'Test Task',
        isDone: false,
      })
      tasks.push(task)
      const result = service.remove('abc123')
      expect(result).toHaveProperty(
        'deletedAt',
        new Date('2025-01-01T00:00:00.000Z'),
      )
    })

    given("task doesn't exist", () => {
      it('throws NotFoundException', () => {
        expect(() => {
          service.remove('abc123')
        }).toThrow(NotFoundException)
      })
    })
  })

  describe('#destroy()', () => {
    it('removes task from data store', () => {
      const task = generateTask({
        id: 'abc123',
        title: 'Test Task',
        isDone: false,
      })
      tasks.push(task)
      const result = service.destroy('abc123')
      expect(result).toEqual(task)
      expect(tasks).not.toContain(task)
    })

    given("task doesn't exist", () => {
      it('throws NotFoundException', () => {
        expect(() => {
          service.destroy('abc123')
        }).toThrow(NotFoundException)
      })
    })
  })
})

function generateTask(task: Partial<Task>): Task {
  return Object.assign(
    {
      title: 'Test Task',
      isDone: false,
      completedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    task,
  ) as Task
}
