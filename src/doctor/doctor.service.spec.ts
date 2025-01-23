import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  // Get all doctors
  async getAllDoctors(): Promise<Doctor[]> {
    return this.doctorRepository.find();
  }

  // Get doctor by ID
  async getDoctorById(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOneBy({ id });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return doctor;
  }

  // Add a new doctor
  async createDoctor(doctor: Partial<Doctor>): Promise<Doctor> {
    const newDoctor = this.doctorRepository.create(doctor);
    return this.doctorRepository.save(newDoctor);
  }

  // Update an existing doctor
  async updateDoctor(id: number, doctor: Partial<Doctor>): Promise<Doctor> {
    await this.getDoctorById(id); // Ensure the doctor exists before updating
    await this.doctorRepository.update(id, doctor);
    return this.getDoctorById(id);
  }

  // Delete a doctor
  async deleteDoctor(id: number): Promise<void> {
    const doctor = await this.getDoctorById(id);
    if (doctor) {
      await this.doctorRepository.delete(id);
    }
  }
}
