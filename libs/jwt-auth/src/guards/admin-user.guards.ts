import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { UserRepository } from '@app/database';

@Injectable()
export class AdminUserGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector, private readonly userRepository: UserRepository,) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthorized = await super.canActivate(context);
    if (!isAuthorized) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    // const user = request.user; // Assuming your JWT strategy sets the user object in the request

    const user = await this.userRepository.findById(request.user.sub);

    // Check if the user has admin type
    const isAdmin = user && user.userType === 'ADMIN';

    // If the user is not an admin, deny access
    if (!isAdmin) {
      return false;
    }

    // User is authorized as an admin
    return true;
  }
}