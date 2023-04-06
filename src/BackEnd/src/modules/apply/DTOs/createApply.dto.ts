import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class createApplyDTO {
    
    @ApiProperty({
        description: 'User ID',
        example: 'id',
    })
    @IsString()
    applicantId: string;
    
    @ApiProperty({
        description: 'Project ID',
        example: 'id',
    })
    @IsString()
    projectId: string;
    
    @ApiProperty({
        description: 'Role ID',
        example: 'id',
    })
    @IsString()
    roleId: string;

    @ApiProperty({
        description: 'Why',
        example: 'Why do you want this job?',
    })
    @IsString()
    why: string;

    @ApiProperty({
        description: 'Habilities',
        example: 'What skills do you want to develop?',
    })
    @IsString()
    habilities: string;

    @ApiProperty({
        description: 'Experiences',
        example: 'name',
    })
    @IsString()
    userId: string;

    @ApiProperty({
        description: 'Message',
        example: 'Mensagem',
    })
    @IsString()
    message: string;
    
    @ApiProperty({
        description: 'Offer ID',
        example: 'id',
    })
    @IsString()
    offerName: string;
 
    @ApiProperty({
        description: 'Status',
        example: 'status',
    })
    @IsString()
    which: string;
}