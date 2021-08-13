import { Allow } from "class-validator";

export class UpdateExpensesDto {

    @Allow()
    Description: string;
    @Allow()
    Amount: number;
}