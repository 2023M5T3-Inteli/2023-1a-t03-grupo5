import { ApiProperty } from "@nestjs/swagger";


export class ResetPasswordDTO {
    @ApiProperty({
        description: 'User email',
        example: 'teste@teste.com',
    })
    email: string;

    @ApiProperty({
        description: 'User password',
        example: '123123',
    })
    newPassword: string;

    @ApiProperty({
        description: 'User password',
        example: '123',
    })
    code: string;
}