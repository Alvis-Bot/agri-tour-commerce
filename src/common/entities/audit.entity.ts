import { CreateDateColumn, Timestamp, UpdateDateColumn } from 'typeorm';

export class AuditEntity {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Timestamp;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Timestamp;
}
