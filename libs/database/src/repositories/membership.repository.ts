import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipEntity } from '../entities';

export class MembershipRepository extends Repository<MembershipEntity> {
    constructor(
        @InjectRepository(MembershipEntity)
        private membershipRepository: Repository<MembershipEntity>
    ) {
        super(membershipRepository.target, membershipRepository.manager, membershipRepository.queryRunner);
    }
}