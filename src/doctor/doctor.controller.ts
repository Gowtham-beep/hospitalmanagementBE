import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Doctor } from './doctor.entity';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  // Get all doctors
  @Get()
  async getAllDoctors(): Promise<Doctor[]> {
    return this.doctorService.getAllDoctors();
  }

  // Get doctor by ID
  @Get(':id')
  async getDoctorById(@Param('id') id: number): Promise<Doctor> {
    return this.doctorService.getDoctorById(id);
  }

  // Add a new doctor
  @Post()
  async createDoctor(@Body() doctor: Partial<Doctor>): Promise<Doctor> {
    return this.doctorService.createDoctor(doctor);
  }

  // Update a doctor
  @Put(':id')
  async updateDoctor(
    @Param('id') id: number,
    @Body() doctor: Partial<Doctor>,
  ): Promise<Doctor> {
    return this.doctorService.updateDoctor(id, doctor);
  }

  // Delete a doctor
  @Delete(':id')
  async deleteDoctor(@Param('id') id: number): Promise<void> {
    return this.doctorService.deleteDoctor(id);
  }
}
