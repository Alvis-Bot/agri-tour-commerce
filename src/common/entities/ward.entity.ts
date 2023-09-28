import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, Relation } from "typeorm";
import { AdministrativeUnit } from "./administrative-unit.entity";
import { District } from "./district.entity";

@Entity({ name: 'wards'})
export class Ward {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true , name: 'name_en' })
  nameEn: string;

  @Column({ nullable: true , name: 'full_name' })
  fullName: string;

  @Column({ nullable: true , name: 'full_name_en' })
  fullNmeEn: string;

  @Column({ nullable: true  , name: 'code_name'})
  codeName: string;

  @ManyToOne(() => AdministrativeUnit)
  @JoinColumn({ name: 'administrative_unit_id'})
  administrativeUnit: AdministrativeUnit;

  @ManyToOne(() => District , district => district.wards)
  @JoinColumn({ name: 'district_code'})
  district: Relation<District>
}
