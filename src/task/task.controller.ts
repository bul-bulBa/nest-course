import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { createTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll() {
     return this.taskService.findAll()
  }

  @Get('/one/:id')
  findById(@Param('id') id: string) {
    return this.taskService.findById(Number(id))
  }

  @Post('/create')
  create(@Body() dto: createTaskDto) {
    return this.taskService.create(dto)
  }

  @Put('/:id') 
  update(@Param('id') id: string, @Body() dto: updateTaskDto) {
    return this.taskService.update(+id, dto)
  }

  @Patch('/:id')
  patchTask(@Param('id') id: string, @Body() dto: Partial<updateTaskDto>) {
    return this.taskService.patchTask(+id, dto)
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.taskService.delete(+id)
  }
}
