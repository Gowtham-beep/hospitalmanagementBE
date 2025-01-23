import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
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
  }
  