import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'administrative_units'})
export class AdministrativeUnit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true , name: 'full_name' })
  fullName: string;

  @Column({ nullable: true , name: 'full_name_en' })
  fullNmeEn: string;

  @Column({ nullable: true , name: 'short_name' })
  shortName: string;

  @Column({ nullable: true , name: 'short_name_en' })
  shortNameEn: string;

  @Column({ nullable: true , name: 'code_name' })
  codeName: string;

  @Column({ nullable: true , name: 'code_name_en' })
  codeNameEn: string;
}
