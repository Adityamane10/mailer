import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionEntity } from '../entities';

export class SubscriptionRepository extends Repository<SubscriptionEntity> {
    constructor(
        @InjectRepository(SubscriptionEntity)
        private subscriptionRepository: Repository<SubscriptionEntity>
    ) {
        super(subscriptionRepository.target, subscriptionRepository.manager, subscriptionRepository.queryRunner);
    }

    async getActiveSubscriptionsForUser(userId: string) {
        const currentDate = new Date();

        const queryBuilder = this.subscriptionRepository.createQueryBuilder('entity');
        queryBuilder.select(['entity.id','entity.spentDays', 'entity.price', 'entity.totalDays', 'entity.startDate', 'entity.endDate']);
        queryBuilder.addSelect(['serviceType.id', 'serviceType.name']);
        queryBuilder.addSelect(['membership.id', 'membership.name']);
        queryBuilder.addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.email', 'user.mobile']);
        queryBuilder.leftJoin('entity.serviceType', 'serviceType');
        queryBuilder.leftJoin('entity.user', 'user');
        queryBuilder.leftJoin('entity.membership', 'membership');
        queryBuilder.where('entity.userId = :userId', { userId });
        queryBuilder.andWhere(':currentDate BETWEEN entity.startDate AND entity.endDate', { currentDate })
        return queryBuilder.getMany();
    }

    async incrementSpentDaysCount(id: string): Promise<void> {
        const queryBuilder = this.subscriptionRepository.createQueryBuilder('entity');
        await queryBuilder
          .update(SubscriptionEntity)
          .set({ spentDays: () => 'spentDays + 1' })
          .where('id = :id', {id})
          .execute();
      }

}