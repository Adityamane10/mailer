import { MembershipRepository } from './membership.repository';
import { ServiceTypeRepository } from './service-type.respository';
import { SubscriptionRepository } from './subscription.respository';
import { UserRepository } from './user.repository';

export const repositories = [
    UserRepository,
    SubscriptionRepository,
    ServiceTypeRepository,
    MembershipRepository
];

export * from './user.repository';
export * from './subscription.respository';
export * from './service-type.respository';
export * from './membership.repository'