//import { IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {

    @ApiProperty({
        description: 'User name',
        example: 'Nome Teste',
    })
    name: string;

    @ApiProperty({
        description: 'User email',
        example: 'teste@teste.com',
    })
    email: string;

    @ApiProperty({
        description: 'User password',
        example: 'id',
    })
    managerId: string;

    @ApiProperty({
        description: 'User password',
        example: '123456',
    })
    password: string;

    @ApiProperty({
        description: 'User CPF',
        example: '123456',
    })
    CPF: string;

     
    @ApiProperty({
        description: 'User phone',
        example: '[{name:JS, level: medio}',
    })
    habilities: string;


    gender: string;
    n_dell: string;
    photoURL: string;
}