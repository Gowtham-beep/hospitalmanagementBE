import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { Queue } from './queue.entity';
import { User } from '../user/user.entity';
import { Doctor } from '../doctor/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Queue, User, Doctor])],
  controllers: [QueueController],
  providers: [QueueService],
})
export class QueueModule {}
