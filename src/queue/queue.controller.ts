import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { QueueService } from './queue.service';
import { Queue } from './queue.entity';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get()
  async getAllQueue(): Promise<Queue[]> {
    return this.queueService.getAllQueue();
  }

  @Post()
  async addPatientToQueue(@Body() queueData: Partial<Queue>): Promise<Queue> {
    return this.queueService.addPatientToQueue(queueData);
  }

  @Get(':id')
  async getQueueById(@Param('id') id: number): Promise<Queue> {
    return this.queueService.getQueueById(id);
  }

  @Put(':id/status')
  async updateQueueStatus(
    @Param('id') id: number,
    @Body('status') status: string,
  ): Promise<Queue> {
    return this.queueService.updateQueueStatus(id, status);
  }

  @Delete(':id')
  async removePatientFromQueue(@Param('id') id: number): Promise<void> {
    return this.queueService.removePatientFromQueue(id);
  }
}
