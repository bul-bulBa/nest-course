import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { createTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
    private tasks = [
        {
            id: 1,
            title: 'learn nest js',
            isCompleted: false,
        },
        {
            id: 2,
            title: 'build rest api',
            isCompleted: true,
        }
    ]

    findAll() {
        return this.tasks
    }

    findById(id: number) {
        const task = this.tasks.find(t => t.id === id)

        if(!task) throw new NotFoundException('not found')

        return task
    }

    create(dto: createTaskDto) {
        const {title, description, priority, tags} = dto
        const newTask = {
            id: this.tasks.length + 1,
            title,
            description,
            priority,
            tags,
            isCompleted: false
        }
 
        this.tasks.push(newTask)

        return newTask
    }

    update(id: number, dto: updateTaskDto) {
        const { title, isCompleted} = dto
        const task = this.findById(id)

        task.title = title
        task.isCompleted = isCompleted

        return task
    }

    patchTask(id: number, dto: Partial<updateTaskDto>) {
        const task = this.findById(id)

        Object.assign(task, dto)

        return task
    }

    delete(id: number) {
        const task = this.findById(id)

        this.tasks = this.tasks.filter(t => t.id !== id)

        return this.tasks
    }
}
