import { IsString, IsEmail } from "class-validator";


export class CreateUserDTO {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    password: string;

    @IsString()
    gender: string;

    @IsString()
    n_dell: string;

    @IsString()
    managerId: string;

    @IsString()
    habilities: string;

    photoURL: string;
}