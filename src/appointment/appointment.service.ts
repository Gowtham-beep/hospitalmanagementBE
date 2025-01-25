import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { DoctorService } from '../doctor/doctor.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly doctorService: DoctorService,
    private readonly userService: UserService,
  ) {}

  // Create a new appointment
  async createAppointment(
    userId: number,
    doctorId: number,
    appointmentDate: Date,
  ): Promise<Appointment> {
    
    // Find the user by userId
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Find the doctor by doctorId
    const doctor = await this.doctorService.getDoctorById(doctorId);
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    // Create the appointment
    const appointment = this.appointmentRepository.create({
      user,
      doctor,
      appointmentDate,
      status: 'Booked',
    });

    // Save the appointment to the database
    return this.appointmentRepository.save(appointment);
  }
  

  // Get all appointments for a user
  async getAppointmentsForUser(userId: number): Promise<Appointment[]> {
    return this.appointmentRepository.find({ where: { user: { id: userId } } });
  }

  // Get all appointments for a doctor
  async getAppointmentsForDoctor(doctorId: number): Promise<Appointment[]> {
    return this.appointmentRepository.find({ where: { doctor: { id: doctorId } } });
  }

  // Get an appointment by ID
  async getAppointmentById(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOneBy({ id });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  // Update an existing appointment
  async updateAppointment(id: number, status: string): Promise<Appointment> {
    const appointment = await this.getAppointmentById(id);
    appointment.status = status;
    return this.appointmentRepository.save(appointment);
  }

  // Cancel an appointment
  async cancelAppointment(id: number): Promise<void> {
    const appointment = await this.getAppointmentById(id);
    appointment.status = 'Cancelled';
    await this.appointmentRepository.save(appointment);
  }
  async getAllAppointments(): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      relations: ['user', 'doctor'], // Include related entities (if needed)
    });
  }

  // Delete an appointment
  async deleteAppointment(id: number): Promise<void> {
    const result = await this.appointmentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
  }
}
