import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'administrative_regions',
})
export class AdministrativeRegion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, name: 'name' })
  name: string;

  @Column({ nullable: true, name: 'name_en' })
  nameEn: string;

  @Column({ nullable: true, name: 'code_name' })
  codeName: string;

  @Column({ nullable: true, name: 'code_name_en' })
  codeNameEn: string;
}
