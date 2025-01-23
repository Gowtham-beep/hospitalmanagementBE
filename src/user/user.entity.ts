import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
  import {Appointment} from '../appointment/appointment.entity'
  
  @Entity('users') // The table name in the database
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100 })
    name: string;
  
    @Column({ unique: true, length: 150 })
    email: string;
  
    @Column({ select: false }) // Exclude password from queries by default
    password: string;
  
    @Column({ default: 'staff' }) // Default role is 'staff', but it can be 'admin', etc.
    role: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(()=> Appointment,(appointment)=>appointment.user)
    appointments:Appointment[]// one user can have many appointments
  }
  