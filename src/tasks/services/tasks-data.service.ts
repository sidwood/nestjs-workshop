import { Injectable, Logger, NotFoundException } from '@nestjs/common'

import { Task } from '@/tasks/entities/task.entity'

@Injectable()
export class TasksDataService {
  private readonly logger = new Logger(TasksDataService.name)

  private _tasks: Task[] = [
    {
      id: 'abc123',
      title: 'Pickup groceries',
      isDone: false,
      completedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ]

  get tasks(): Task[] {
    return this._tasks
  }

  set tasks(tasks: Task[]) {
    this._tasks = tasks
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll(query = { limit: 50, offset: 0 }) {
    const tasks = this.tasks.filter((task) => task.deletedAt === null)
    return { tasks, count: tasks.length }
  }

  findOne(id: string) {
    const task = this.tasks.find((task) => task.id === id)
    if (task) {
      return task
    } else {
      throw new NotFoundException('Task not found')
    }
  }

  create(createTaskDto: Partial<Task>) {
    const isDone = createTaskDto.isDone || false
    createTaskDto.id = Math.random().toString(36).substr(2, 9)
    createTaskDto.isDone = isDone
    createTaskDto.completedAt = isDone ? new Date() : null
    createTaskDto.createdAt = new Date()
    createTaskDto.updatedAt = new Date()
    createTaskDto.deletedAt = null
    this.tasks.push(createTaskDto as Task)
    return createTaskDto
  }

  update(id: string, updateTaskDto: Partial<Task>) {
    const task = this.tasks.find((task) => task.id === id)
    if (task) {
      task.title = updateTaskDto.title || task.title
      task.isDone = updateTaskDto.isDone ?? task.isDone
      task.completedAt = updateTaskDto.isDone ? new Date() : null
      task.updatedAt = new Date()
      return task
    } else {
      throw new NotFoundException('Task not found')
    }
  }

  remove(id: string) {
    const task = this.tasks.find((task) => task.id === id)
    if (task) {
      task.deletedAt = new Date()
      return task
    } else {
      throw new NotFoundException('Task not found')
    }
  }

  destroy(id: string) {
    const index = this.tasks.findIndex((task) => task.id === id)
    const task = this.tasks[index]
    if (index >= 0) {
      this.tasks.splice(index, 1)
      return task
    } else {
      throw new NotFoundException('Task not found')
    }
  }
}
