import { IsNotEmpty, IsNumber } from "class-validator";


export class ChangeLimitDto {
    @IsNotEmpty()
    @IsNumber()
    MaxAmountLimit: number;
}