import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Queue } from './queue.entity';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(Queue)
    private readonly queueRepository: Repository<Queue>,
  ) {}

  // Get all patients in the queue
  async getAllQueue(): Promise<Queue[]> {
    return this.queueRepository.find({ relations: ['user', 'doctor'] });
  }

  // Add a patient to the queue
  async addPatientToQueue(queueData: Partial<Queue>): Promise<Queue> {
    const queue = this.queueRepository.create(queueData);
    return this.queueRepository.save(queue);
  }

  // Get queue details by ID
  async getQueueById(id: number): Promise<Queue> {
    const queue = await this.queueRepository.findOne({
      where: { id },
      relations: ['user', 'doctor'],
    });

    if (!queue) {
      throw new NotFoundException(`Queue with ID ${id} not found`);
    }
    return queue;
  }

  // Update queue status
  async updateQueueStatus(id: number, status: string): Promise<Queue> {
    const queue = await this.getQueueById(id);
    queue.status = status;
    return this.queueRepository.save(queue);
  }

  // Delete a patient from the queue
  async removePatientFromQueue(id: number): Promise<void> {
    const queue = await this.getQueueById(id);
    await this.queueRepository.remove(queue);
  }
}
