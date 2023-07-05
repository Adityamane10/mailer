import { IsNotEmpty, IsOptional } from "class-validator";

export class UsersListFilterDto {
    @IsOptional()
    name: string;

    @IsNotEmpty({ message: 'Skip parametere is required' })
    skip: number;

    @IsNotEmpty({ message: 'Limit parametere is required' })
    limit: number;
}