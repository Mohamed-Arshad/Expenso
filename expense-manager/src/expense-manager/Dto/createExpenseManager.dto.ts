import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class createExpenseManagerDto{
    @IsNotEmpty()
    ProfileId: string;

    @IsNotEmpty()
    @IsNumber()
    MaxAmountLimit: number;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    CreatedDate: Date;
}