import { UserEntity, UserRepository, UserType } from '@app/database';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersListFilterDto } from './dto/user-filter.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from '@app/mailer';

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository,


    ) { }

    async getAll(filter: UsersListFilterDto) {
        const queryBuilder = this.userRepository.createQueryBuilder('u')
            .select(['u.id', 'u.firstName', 'u.lastName', 'u.mobile', 'u.address', "u.age", "u.ageGroup", "u.gender", "u.timeSlot", "u.userType"])
            .where("u.userType != 'ADMIN'")
            .orderBy("u.createdAt", "DESC");

        if (filter.name) {
            queryBuilder.andWhere(`concat_ws(' ', u.firstName, u.lastName) ILIKE :name`, { name: `%${filter.name}%` })
        }
        if (filter.skip) {
            queryBuilder.skip(filter.skip);
        }

        if (filter.limit) {
            queryBuilder.take(filter.limit);
        }

        const [result, total] = await queryBuilder.getManyAndCount();

        return { data: { users: result, total }, message: 'Service Type Users List' };
    }

    async findOne(id: string) {
        const user = await this.userRepository.findById(id);
        return { data: user, message: 'User By Id' }
    }

    // Encode User Password
    async encodePassword(password: string) {
        const salt: string = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    async create(input: CreateUserDto) {
        const { firstName, lastName, mobile, email } = input;

        // check if the user exists in the db    
        const userInDb = await this.userRepository.findOne({
            where: [{ email: email }, { mobile: mobile }]
        })

        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        input.password = await this.encodePassword(input.password);

        const user = await this.userRepository.create(input);
        const data = await this.userRepository.save(user);

        return {
            data: data,
            message: 'User Created Successfully'
        }
    }

    async update(id: string, user: UpdateUserDto): Promise<UserEntity> {
        const existingUser = await this.userRepository.findById(id);
        if (!existingUser) {
            throw new Error('User not found');
        }
        const updatedUser = { ...existingUser, ...user };
        return this.userRepository.save(updatedUser);
    }

    async delete(id: string) {
        await this.userRepository.delete(id);
        return { message: 'User deleted successfully', data: null };
    }

}
