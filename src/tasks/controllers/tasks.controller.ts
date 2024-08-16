import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Param,
  Post,
  Query,
} from '@nestjs/common'

import { CreateTaskDto } from '@/tasks/dtos/create-task.dto'
import { PaginationQueryDto } from '@/shared/dtos/pagination-query.dto'
import { TasksDataService } from '@/tasks/services/tasks-data.service'
import { UpdateTaskDto } from '@/tasks/dtos/update-task.dto'

@Controller({ path: 'tasks' })
export class TasksController {
  constructor(private readonly tasksDataService: TasksDataService) {}

  @Get()
  allTasks(@Query() queryDto: PaginationQueryDto) {
    const { limit = 50, offset = 0 } = queryDto
    const { tasks, count } = this.tasksDataService.findAll(queryDto)
    return {
      data: tasks,
      meta: { total: count, limit, offset },
    }
  }

  @Get(':id')
  getTask(@Param('id') id: string) {
    const data = this.tasksDataService.findOne(id)
    return { data, meta: {} }
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    const data = this.tasksDataService.create(createTaskDto)
    return { data, meta: {} }
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const data = this.tasksDataService.update(id, updateTaskDto)
    return { data, meta: {} }
  }

  @Delete(':id')
  removeTask(@Param('id') id: string, @Query('hard') hard = false) {
    if (hard) {
      const data = this.tasksDataService.destroy(id)
      return { data, meta: {} }
    } else {
      const data = this.tasksDataService.remove(id)
      return { data, meta: {} }
    }
  }
}
