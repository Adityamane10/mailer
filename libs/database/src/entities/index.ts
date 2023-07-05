import { MembershipEntity } from "./membership.entity";
import { ServiceTypeEntity } from "./service-type.entity";
import { SubscriptionEntity } from "./subscription.entity";
import { UserEntity } from "./user.entity";

export const entities = [
    UserEntity,
    ServiceTypeEntity,
    SubscriptionEntity,
    MembershipEntity
];

export * from './user.entity';
export * from './service-type.entity';
export * from './subscription.entity';
export * from './membership.entity';