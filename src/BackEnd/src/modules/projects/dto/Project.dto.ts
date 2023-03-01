/* eslint-disable prettier/prettier */
import { IsString, IsBoolean } from "class-validator";

export class ProjectDTO {
    @IsString()
    projectId: string

    @IsString()
    name: string

    @IsString()
    createdAt: string

    @IsString()
    updatedAt: string

    @IsString()
    tasks: string

    @IsString()
    start: string

    @IsString()
    end: string

    @IsString()
    coleaderId: string

    @IsString()
    ownerId: string

    @IsString()
    projectType: string

    @IsBoolean()
    blockedSubscription: boolean
}                 