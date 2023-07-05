import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities';

export class UserRepository extends Repository<UserEntity> {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }

    async findByEmail(email: string): Promise<UserEntity> {
        return await this.userRepository.findOneBy({ email });
    }

    async findById(id: string): Promise<UserEntity> {
        return await this.userRepository.findOneBy({ id });
    }
}