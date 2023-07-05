import { UserType } from "@app/database";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { SubscriptionDto } from "./subscription.dto";

export class SignupUserDto {
    @IsNotEmpty({ message: 'First Name Is Required' })
    firstName: string;

    @IsNotEmpty({ message: 'Last Name Is Required' })
    lastName: string;

    @IsNotEmpty({ message: 'Email Is Required' })
    @IsEmail({}, { message: 'Email must be valid email address' })
    email: string;

    @IsNotEmpty({ message: 'Mobile Is Required' })
    @IsPhoneNumber("IN", { message: 'Invalid Mobile Number' })
    mobile: string;

    @IsNotEmpty({ message: 'Address Is Required' })
    address: string;

    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @IsOptional()
    userType: UserType;

    @ValidateNested()
    @Type(() => SubscriptionDto)
    subscription: SubscriptionDto
}
