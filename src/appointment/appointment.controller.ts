import { Controller, Post, Get, Param, Body, Put, Delete } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.entity';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  // Create a new appointment
  @Post()
  async createAppointment(
    @Body('userId') userId: number,
    @Body('doctorId') doctorId: number,
    @Body('appointmentDate') appointmentDate: Date,
  ): Promise<Appointment> {
    return this.appointmentService.createAppointment(userId, doctorId, appointmentDate);
  }

  // Get all appointments for a user
  @Get('user/:userId')
  async getAppointmentsForUser(@Param('userId') userId: number): Promise<Appointment[]> {
    return this.appointmentService.getAppointmentsForUser(userId);
  }

  // Get all appointments for a doctor
  @Get('doctor/:doctorId')
  async getAppointmentsForDoctor(@Param('doctorId') doctorId: number): Promise<Appointment[]> {
    return this.appointmentService.getAppointmentsForDoctor(doctorId);
  }

  // Get an appointment by ID
  @Get(':id')
  async getAppointmentById(@Param('id') id: number): Promise<Appointment> {
    return this.appointmentService.getAppointmentById(id);
  }

  // Update an appointment status
  @Put(':id/status')
  async updateAppointmentStatus(
    @Param('id') id: number,
    @Body('status') status: string,
  ): Promise<Appointment> {
    return this.appointmentService.updateAppointment(id, status);
  }

  // Cancel an appointment
  @Put(':id/cancel')
  async cancelAppointment(@Param('id') id: number): Promise<void> {
    return this.appointmentService.cancelAppointment(id);
  }

  // Delete an appointment
  @Delete(':id')
  async deleteAppointment(@Param('id') id: number): Promise<void> {
    return this.appointmentService.deleteAppointment(id);
  }
}
