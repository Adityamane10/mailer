import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies';
import { AccessTokenGuard } from './guards/access-token.guards';
import { DatabaseModule } from '@app/database';
import { AdminUserGuard } from './guards/admin-user.guards';

@Module({
  imports: [JwtModule.register({}), DatabaseModule],
  providers: [JwtService, AccessTokenStrategy, AccessTokenGuard, AdminUserGuard],
  exports: [JwtService, AccessTokenStrategy],
})
export class JwtAuthModule { }
