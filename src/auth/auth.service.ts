import { UserRepository, UserType } from '@app/database';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignupUserDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { SubscriptionsService } from 'src/subscriptions/subscriptions.service';
import { SignupInDto } from './dto/signin.dto';
import { MailService } from '@app/mailer';
import * as otpGenerator from 'otp-generator';


@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly subscriptionService: SubscriptionsService,
        private readonly mailerservice:MailService
    ) { }



    // Encode User Password
    async encodePassword(password: string) {
        const salt: string = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    // Validate User's password
    async isPasswordValid(password: string, userPassword: string) {
        return bcrypt.compareSync(password, userPassword);
    }
    
    

    async signUp(input: SignupUserDto) {
        const { firstName, lastName, mobile, email, userType } = input;

        if (userType === UserType.ADMIN) {
            throw new HttpException(`User Of Type: ${userType} is not allowed to sign up, please contact admin`, HttpStatus.FORBIDDEN);
        }
        // check if the user exists in the db    
        const userInDb = await this.userRepository.findOne({
            where: [{ email: email }, { mobile: mobile }]
        })

        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        input.password = await this.encodePassword(input.password);

        const otp = await generatenumericotp;
        const user = await this.userRepository.create({...input , otp});
        await this.mailerservice.sendOtp(user , otp)
        const data = await this.userRepository.save(user);

        let subscription = {};
        if (input?.subscription) {
            subscription = await this.subscriptionService.create({ userId: data.id, ...input.subscription });
        }


        return {
            data: { user: data, subscription },
            message: 'User Registered Successfully'
        };
    }

    async signIn(input: SignupInDto) {
        try {
            const user = await this.userRepository.findOne({
                where: [{ email: input.userName }, { mobile: input.userName }],
                select: ['id', 'firstName', 'lastName', 'email', 'mobile', 'password', 'userType']
            });


            if (!user) {
                throw new HttpException('No user found', HttpStatus.UNAUTHORIZED);
            }

            const areEqual = await this.isPasswordValid(input.password, user.password);
            if (!areEqual) {
                throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
            }

            delete user.password;
            const userResponse: any = user;

            userResponse.authToken = await this.jwtService.signAsync({
                email: user.email,
                sub: user.id
            }, { secret: this.configService.get<string>('JWT_ACCESS_SECRET'), });

            await this.userRepository.update(user.id, { accessToken: userResponse.authToken, lastLoginAt: new Date() });

            return { data: userResponse, message: 'Logged in successfully' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async logout(userId: string) {
        await this.userRepository.update(userId, { accessToken: null });

        return {
            data: null,
            message: 'User logged out successfully'
        };
    }
}

const generatenumericotp = otpGenerator.generate(4, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });