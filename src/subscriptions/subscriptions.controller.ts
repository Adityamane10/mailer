import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { AccessTokenGuard } from '@app/jwt-auth/guards/access-token.guards';
import { AdminUserGuard } from '@app/jwt-auth/guards/admin-user.guards';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) { }

  @UseGuards(AccessTokenGuard)
  @Get('active/:userId')
  getActiveSubscriptions(@Param('userId') userId: string) {
    return this.subscriptionsService.getActiveSubscriptionsForUser(userId);
  }

  @UseGuards(AccessTokenGuard)
  @Get('getAllMemberShips')
  getAllMemberShips() {
    return this.subscriptionsService.getAllMemberShips();
  }

  @UseGuards(AccessTokenGuard)
  @Get('getAllServiceTypes')
  getAllServiceTypes() {
    return this.subscriptionsService.getAllServiceTypes();
  }

  @UseGuards(AccessTokenGuard)
  @Get('updateSpentDaysCount/:subscriptionId')
  updateSpentDaysCount(@Param('subscriptionId') subscriptionId: string) {
    return this.subscriptionsService.updateSpentDaysCount(subscriptionId);
  }


  @UseGuards(AdminUserGuard)
  @Post('create')
  createSubscription(@Body() createDto: CreateSubscriptionDto) {
    return this.subscriptionsService.create(createDto);
  }
}
