import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [DoctorService], // Export if other modules need it
})
export class DoctorModule {}
