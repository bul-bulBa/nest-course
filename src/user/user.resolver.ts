import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './models/user.model';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.guard';
import { UserRole, type User } from 'generated/prisma/client';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Authorization()
  @Query(() => UserModel)
  getMe(@Authorized() user: User) {
    return user 
  }

  @Authorization(UserRole.ADMIN)
  @Query(() => [UserModel], {
    name: 'getAllUsers',
    description: 'get array with all registred users in database'
  })
  async getUsers() {
    return await this.userService.findAll()
  } 
}
 