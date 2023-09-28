import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { AdministrativeRegion } from "./administrative-region.entity";
import { AdministrativeUnit } from "./administrative-unit.entity";
@Entity({ name: 'provinces'})
export class Province {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true , name: 'name_en' })
  nameEn: string;

  @Column({ nullable: true , name: 'full_name'  })
  fullName: string;

  @Column({ nullable: true , name: 'full_name_en' })
  fullNameEn: string;

  @Column({ nullable: true , name: 'code_name' })
  codeName: string;

  @ManyToOne(() => AdministrativeRegion)
  @JoinColumn({ name: 'administrative_region_id'})
  administrativeRegion: AdministrativeRegion;

  @ManyToOne(() => AdministrativeUnit)
  @JoinColumn({ name: 'administrative_unit_id'})
  administrativeUnit: AdministrativeUnit;
}
