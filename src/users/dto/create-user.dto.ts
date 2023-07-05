import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({ message: 'First Name Is Required' })
    firstName: string;

    @IsNotEmpty({ message: 'Last Name Is Required' })
    lastName: string;

    @IsNotEmpty({ message: 'Email Is Required' })
    @IsEmail({}, { message: 'Email must be valid email address' })
    email: string;

    @IsNotEmpty({ message: 'Mobile Is Required' })
    @IsPhoneNumber("IN", {message: 'Invalid Mobile Number'})
    mobile: string;

    @IsNotEmpty({ message: 'Address Is Required' })
    address: string;

    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @IsNotEmpty({message: 'Age is required'})
    age: number;
    
    @IsNotEmpty({message: 'Age group is required'})
    ageGroup: string;
    
    @IsNotEmpty({message: 'Gender is required'})
    gender: string;
    
    @IsNotEmpty({message: 'Time slot is required'})
    timeSlot: string;
}
