import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/database';
import { HelpersModule } from '@app/helpers';
import { SubscriptionsController } from './subscriptions/subscriptions.controller';
import { SubscriptionsService } from './subscriptions/subscriptions.service';
import { JwtAuthModule } from '@app/jwt-auth';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { MailModule } from '@app/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    HelpersModule,
    JwtAuthModule,
    MailModule
  ],
  controllers: [UsersController, SubscriptionsController, AuthController],
  providers: [
    UsersService, SubscriptionsService, AuthService
  ],
})
export class AppModule { }
