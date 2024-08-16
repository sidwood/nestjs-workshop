import { Module } from '@nestjs/common'

import { TasksController } from '@/tasks/controllers/tasks.controller'
import { TasksDataService } from '@/tasks/services/tasks-data.service'

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TasksDataService],
  exports: [],
})
export class TasksModule {}
