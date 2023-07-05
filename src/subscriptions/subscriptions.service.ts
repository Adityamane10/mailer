import { MembershipRepository, ServiceTypeRepository, SubscriptionEntity, SubscriptionRepository } from '@app/database';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
    constructor(
        private readonly subscriptionRepository: SubscriptionRepository,
        private readonly serviceTypeRepository: ServiceTypeRepository,
        private readonly membershipRepository: MembershipRepository,
    ) { }

    async getAllMemberShips() {
        const subscriptions = await this.membershipRepository.find({ select: ['id', 'name', 'validityDays'] });
        return {
            message: 'Memberships List',
            data: subscriptions
        };
    }

    async getAllServiceTypes() {
        const serviceTypes = await this.serviceTypeRepository.find({ select: ['id', 'name'] });
        return {
            message: 'Service Types List',
            data: serviceTypes
        };
    }

    async getActiveSubscriptionsForUser(userId: string) {
        const subscriptions = await this.subscriptionRepository.getActiveSubscriptionsForUser(userId);
        return {
            message: 'Active User Subscriptions',
            data: subscriptions
        };
    }


    async create(createDto: CreateSubscriptionDto) {
        const membership = await this.membershipRepository.findOneBy({ id: createDto.membershipId });

        if (!membership) {
            return new HttpException('Invalid Membership', HttpStatus.BAD_REQUEST);
        }

        const subscription = new SubscriptionEntity();
        subscription.price = createDto.price;
        subscription.membershipId = createDto.membershipId;
        subscription.totalDays = membership.validityDays;
        subscription.endDate = new Date();
        subscription.startDate = createDto?.startDate ? new Date(createDto.startDate) : new Date();

        //: set end date
        subscription.endDate.setDate(subscription.startDate.getDate() + membership.validityDays);
        subscription.spentDays = 0;

        subscription.paymentMode = createDto.paymentMode;
        subscription.userId = createDto.userId;
        subscription.serviceTypeId = createDto.serviceTypeId;

        const newSubscription = await subscription.save();

        return {
            message: 'User Subscribed Successfully',
            data: newSubscription
        };
    }

    async updateSpentDaysCount(subscriptionId: string){
        await this.subscriptionRepository.incrementSpentDaysCount(subscriptionId);
        return {
            message: 'Spent days count updated successfully',
            data: null
        }
    }
}
