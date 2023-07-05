import { PaymentMode } from "@app/database";
import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class SubscriptionDto {
    @IsNotEmpty({ message: 'Service Type Id Is Required' })
    serviceTypeId: string;

    @IsNotEmpty({ message: 'Membership Id Is Required' })
    membershipId: string;

    @IsOptional()
    startDate?: Date;

    @IsNotEmpty({message: 'Price is required'})
    price: number;

    @IsNotEmpty({ message: 'Payment Mode Is Required' })
    paymentMode: PaymentMode
}
