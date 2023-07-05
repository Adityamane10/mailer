import { UserType } from "@app/database";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, ValidateNested } from "class-validator";

export class SignupInDto {
    @IsNotEmpty({ message: 'Username Is Required' })
    userName: string;

    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}
