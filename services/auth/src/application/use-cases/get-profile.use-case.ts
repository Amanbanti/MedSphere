import { Injectable, Inject } from '@nestjs/common';
import type { UserDto } from '@medsphere/shared';
import type { GetProfileQuery } from '../queries/get-profile.query';
import { NotFoundError } from '../../domain/errors/auth.errors';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../../domain/repositories/user.repository';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class GetProfileUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepository,
  ) {}

  async execute(query: GetProfileQuery): Promise<UserDto> {
    const user = await this.userRepo.findById(query.userId);
    if (!user || user.isDeleted()) {
      throw new NotFoundError('User not found');
    }
    return UserMapper.toDto(user);
  }
}
