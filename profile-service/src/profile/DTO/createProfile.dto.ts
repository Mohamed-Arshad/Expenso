import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateProfileDto {
    @IsNotEmpty()
    @IsString()
    Name: string;

    @IsNotEmpty()
    @IsString()
    UserName: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: `Password should contain A mixture of both uppercase and lowercase letters, at least a number and at least one special character`})
    Password: string;
}