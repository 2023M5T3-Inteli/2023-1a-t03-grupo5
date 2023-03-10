import { ApiProperty } from "@nestjs/swagger";


export class LoginDTO {
    @ApiProperty({
        description: 'User email',
        example: 'teste@teste.com',
    })
    email: string;

    @ApiProperty({
        description: 'User password',
        example: '123123',
    })
    password: string;
}