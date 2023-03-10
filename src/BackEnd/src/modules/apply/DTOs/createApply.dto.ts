import { ApiProperty } from "@nestjs/swagger";


export class createApplyDTO {

    @ApiProperty({
        description: 'User ID',
        example: 'id',
    })
    applicantId: string;
    
    @ApiProperty({
        description: 'Project ID',
        example: 'id',
    })
    projectId: string;
    
    @ApiProperty({
        description: 'Role ID',
        example: 'id',
    })
    roleId: string;

    @ApiProperty({
        description: 'Why',
        example: 'Why do you want this job?',
    })
    why: string;

    @ApiProperty({
        description: 'Habilities',
        example: 'What skills do you want to develop?',
    })
    habilities: string;

    @ApiProperty({
        description: 'Experiences',
        example: 'name',
    })
    userId: string;

    @ApiProperty({
        description: 'Message',
        example: 'Mensagem',
    })
    message: string;
    
    @ApiProperty({
        description: 'Offer ID',
        example: 'id',
    })
    offerId: string;
    
}