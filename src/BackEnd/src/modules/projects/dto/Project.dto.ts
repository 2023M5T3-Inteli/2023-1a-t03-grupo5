import { IsString, IsBoolean } from "class-validator";

export class ProjectDTO {
    @IsString()
    name: string

    @IsString()
    tasks: string

    coleaderId?: string

    @IsString()
    description: string

    @IsString()
    ownerId: string

    @IsString()
    projectType: string

    blockedSubscription: boolean
}                 