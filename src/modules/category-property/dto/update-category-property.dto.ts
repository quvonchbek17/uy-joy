import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryPropertyDto } from './create-category-property.dto';

export class UpdateCategoryPropertyDto extends PartialType(CreateCategoryPropertyDto) {}
