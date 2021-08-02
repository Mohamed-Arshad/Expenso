import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class AddExpensesDto {
    @IsNotEmpty()
    ProfileId: string;

    @IsNotEmpty()
    Description: string;

    @IsNotEmpty()
    @IsNumber()
    Amount: number;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    Time: Date;
}