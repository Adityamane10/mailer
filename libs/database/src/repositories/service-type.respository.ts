import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceTypeEntity } from '../entities';

export class ServiceTypeRepository extends Repository<ServiceTypeEntity> {
    constructor(
        @InjectRepository(ServiceTypeEntity)
        private serviceTypeRepository: Repository<ServiceTypeEntity>
    ) {
        super(serviceTypeRepository.target, serviceTypeRepository.manager, serviceTypeRepository.queryRunner);
    }
}