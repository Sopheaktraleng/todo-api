import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepo: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepo.create(createTaskDto);
    return await this.tasksRepo.save(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.tasksRepo.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepo.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Task #${id} not found`);
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, updateTaskDto);
    return await this.tasksRepo.save(task);
  }

  async remove(id: number): Promise<{ success: true; id: number }> {
    const task = await this.findOne(id);
    await this.tasksRepo.remove(task);
    return { success: true, id };
  }
}
