import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class AddCategoryDto {
    @IsNotEmpty()
    ProfileId: string;

    @IsNotEmpty()
    Name: string;

    @IsNotEmpty()
    @IsNumber()
    MaxAmountLimit: number;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    CreatedDate: Date;
}