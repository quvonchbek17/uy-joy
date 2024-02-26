import { IsString, IsUUID } from "class-validator";

export class GetByCategoryIdParamsDto {
    @IsString()
    @IsUUID()
    categoryId: string;
}

export class UpdateParamsDto {
    @IsString()
    @IsUUID()
    id: string;
}
