import { Allow } from "class-validator";

export class FindFilterDto {

    @Allow()
    id:string[];
}