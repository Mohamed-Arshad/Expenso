import { IsNotEmpty } from "class-validator";

export class ExpenseDto {
    @IsNotEmpty()
    Id:string;
}