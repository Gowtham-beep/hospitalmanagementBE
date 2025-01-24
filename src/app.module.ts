import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:'.env'
    }), // Loads environment variables from .env file
    TypeOrmModule.forRoot({
      type: 'mysql', // Using MySQL
      host: process.env.DB_HOST, // Database host (e.g., Aiven's hostname)
      port: process.env.DB_PORT ? +process.env.DB_PORT : 3306, // Default MySQL port
      username: process.env.DB_USER, // Your Aiven username
      password: process.env.DB_PASS, // Your Aiven password
      database: process.env.DB_NAME, // Your database name
      autoLoadEntities: true, // Automatically load entities
      synchronize: false, // Keep as false in production to avoid accidental schema changes
      dropSchema:false,
      ssl:true,
    }),
    AuthModule,
    DoctorModule,
    UserModule,
    AppointmentModule,
    QueueModule,
  ],
})
export class AppModule {}
