import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToMany, Relation } from "typeorm";
import { AdministrativeUnit } from "./administrative-unit.entity";
import { Ward } from "./ward.entity";
import { Province } from "@/common/entities/province.entity";
@Entity({ name: 'districts'})
export class District {
  @PrimaryColumn()
  code: string;

  @Column({ nullable: true, name: 'name' })
  name: string;

  @Column({ nullable: true, name: 'name_en' })
  nameEn: string;

  @Column({ nullable: true, name: 'full_name' })
  fullName: string;

  @Column({ nullable: true, name: 'full_name_en' })
  fullNmeEn: string;

  @Column({ nullable: true, name: 'code_name' })
  codeName: string;

  @ManyToOne(() => AdministrativeUnit)
  @JoinColumn({ name: 'administrative_unit_id' })
  administrativeUnit: AdministrativeUnit;

  @ManyToOne(() => Province)
  @JoinColumn({ name: 'province_code' })
  province: Relation<Province>


  @OneToMany(() => Ward, ward => ward.district)
  wards: Ward[];
}
