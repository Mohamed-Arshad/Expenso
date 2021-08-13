import { IsNotEmpty } from "class-validator";

export class CategoryDto {
    @IsNotEmpty()
    Id:string;
}