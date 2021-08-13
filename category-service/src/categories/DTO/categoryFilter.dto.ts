import { Allow } from "class-validator";

export class CategoryFilterDto {

    @Allow()
    id:string[];
}