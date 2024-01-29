import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateResidenceDto {

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    categories: string[]
}