import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class AuditEntity {


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
