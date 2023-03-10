import { ApiProperty } from "@nestjs/swagger";



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
    name: string

    @ApiProperty({
        description: 'Project description',
        example: '10/10/2023',
    })
    createdAt: Date

    @ApiProperty({
        description: 'Project description',
        example: '10/10/2023',
    })
    updatedAt: Date

    @ApiProperty({
        description: 'Project description',
        example: 'o projeto e sobre desenvolvimento de uma aplicação',
    })
    description: string

    @ApiProperty({
        description: 'Project tasks',
        example: 'tarefas',
    })
    tasks: string

    @ApiProperty({
        description: 'Project start date',
        example: '10/10/2023',
    })
    start: Date

    @ApiProperty({
        description: 'Project end date',
        example: '10/10/2023',
    })
    end: Date

    @ApiProperty({
        description: 'Project coleader ID',
        example: '56',
    })
    coleaderId: string

    @ApiProperty({
        description: 'Project owner ID',
        example: '20',
    })
    ownerId: string

    @ApiProperty({
        description: 'Project type',
        example: 'dev',
    })
    projectType: string

    @ApiProperty({
        description: 'Project blocked subscription',
        example: 'true',
    })
    blockedSubscription: boolean
}                 