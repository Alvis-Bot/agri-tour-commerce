import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum IdentityType {
	CMND = 'CMND',
	CCCD = 'CCCD',
	HC = 'HC',
}

@Entity('identities')
export class Identity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'enum',
		enum: IdentityType,
		default: IdentityType.CMND,
	})
	identityType: IdentityType;

	@Column()
	// số chứng minh nhân dân
	number: string;

	@Column()
	fullName: string;

	@Column()
	// ảnh chứng minh nhân dân
	identityImage: string;

	// ảnh cầm  cmnd
	@Column()
	identityImageHold: string;
}
