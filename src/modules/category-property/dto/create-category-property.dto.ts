import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateCategoryPropertyDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsUUID()
    categoryId: string;
}
