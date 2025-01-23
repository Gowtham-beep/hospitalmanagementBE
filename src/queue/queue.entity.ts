import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Doctor } from '../doctor/doctor.entity';

@Entity()
export class Queue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @Column()
  queueNumber: number;

  @Column()
  status: string; // E.g., "Waiting", "With Doctor", "Completed"

  @Column()
  createdAt: Date; // To store the time when the patient was added to the queue
}
