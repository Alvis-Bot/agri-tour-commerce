import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class AuditEntity {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
