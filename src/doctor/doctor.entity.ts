import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {Appointment} from '../appointment/appointment.entity'
@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  specialization: string;

  @Column()
  gender: string;

  @Column()
  location: string;

  @Column()
  availability: string; // Example: "Mon-Fri, 9 AM - 5 PM"
  @OneToMany(()=>Appointment,(appointment=>appointment.doctor))
  appointments:Appointment[]

}
