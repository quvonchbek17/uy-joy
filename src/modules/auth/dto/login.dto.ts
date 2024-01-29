
import { IsNumber, IsString, Length, MaxLength } from 'class-validator'

export class Login {
    @IsString()
    phone: string;

    @IsString()
    @MaxLength(20)
    password: string;
}
