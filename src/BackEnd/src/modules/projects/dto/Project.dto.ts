import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsDate } from "class-validator";



export class ProjectDTO {

    @ApiProperty({
        description: 'Project ID',
        example: '12345',
    }
    )
    
    projectId: string 
    
    @ApiProperty({
        description: 'Project name',
        example: 'Desenvolvimento de aplicação',
    })
    @IsString()
    name: string

    @ApiProperty({
        description: 'Project description',
        example: '10/10/2023',
    })
    @IsString()
    @IsDate()
    createdAt: Date

    @ApiProperty({
        description: 'Project description',
        example: '10/10/2023',
    })
    @IsString()
    @IsDate()
    updatedAt: Date

    @ApiProperty({
        description: 'Project description',
        example: 'o projeto e sobre desenvolvimento de uma aplicação',
    })
    @IsString()
    description: string

    @ApiProperty({
        description: 'Project tasks',
        example: 'tarefas',
    })
    @IsString()
    tasks: string

    @ApiProperty({
        description: 'Project start date',
        example: '10/10/2023',
    })
    @IsString()
    @IsDate()
    start: Date

    @ApiProperty({
        description: 'Project end date',
        example: '10/10/2023',
    })
    @IsString()
    @IsDate()
    end: Date

    @ApiProperty({
        description: 'Project coleader ID',
        example: '56',
    })
    @IsString()
    coleaderId: string

    @ApiProperty({
        description: 'Project owner ID',
        example: '20',
    })
    @IsString()
    ownerId: string

    @ApiProperty({
        description: 'Project type',
        example: 'dev',
    })
    @IsString()
    projectType: string

    @ApiProperty({
        description: 'Project blocked subscription',
        example: 'true',
    })
    @IsString()
    @IsBoolean()
    blockedSubscription: boolean
}                