import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/signup.dto';
import { SignupInDto } from './dto/signin.dto';
import { AccessTokenGuard } from '@app/jwt-auth/guards/access-token.guards';
import { GetCurrentUserId } from 'src/auth/decorators/get-current-user-id.decorator';
import { AdminUserGuard } from '@app/jwt-auth/guards/admin-user.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // @UseGuards(AdminUserGuard)
  @Post('/signup')
  signUp(@Body() input: SignupUserDto) {
    return this.authService.signUp(input);
  }

  @Post('/signin')
  signIn(@Body() input: SignupInDto) {
    return this.authService.signIn(input);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logOut(@GetCurrentUserId() userId) {
    return this.authService.logout(userId);
  }

}
