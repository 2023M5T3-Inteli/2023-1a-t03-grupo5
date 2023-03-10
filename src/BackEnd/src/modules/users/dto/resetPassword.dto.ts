import { IsString, IsEmail } from "class-validator";


export class ResetPasswordDTO {
    @IsString()
    email: string;

    @IsString()
    newPassword: string;

    @IsString()
    code: string;
}