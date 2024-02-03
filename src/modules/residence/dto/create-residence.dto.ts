import { ArrayNotEmpty, ArrayUnique, IsNotEmpty, IsString, IsUUID, ValidateNested } from "class-validator";

export class CreateResidenceDto {

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNotEmpty({ message: 'categories majburiy' })
    @ArrayNotEmpty({ message: "categories bo'sh bo'lishi mumkin emas" })
    @ArrayUnique({ message: "categoriesda id lar takrorlangan. unique bo'lishi kerak" })
    @IsUUID(undefined, { each: true, message: "ID lar uuid bo'lishi kerak" })
    categories: string[]
}