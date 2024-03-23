import { User } from '@/common/entities/user.entity';

export interface AuthenticatedRequest {
	user: User;
}
