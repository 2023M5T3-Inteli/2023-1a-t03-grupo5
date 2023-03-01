/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProjectDTO } from './dto/Project.dto';


@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) {}

    async createProject(data: ProjectDTO){
        const projectExists = await this.prisma.project.findFirst({
            where: {
                projectId: data.projectId
            }
        })

        if(projectExists) {
            throw new Error('Project already exists');
        }

        const project = await this.prisma.project.create({

            data,
        });
    
        return project;
    }

    async getAllProjects(){
        const allProjects = await this.prisma.project.findMany({
            select: {
                projectId: true,
                name: true,
                start: true,
                end: true,
                description: true,
                ownerId: true,
                coleaderId: true,
                projectType: true,
            }
        });
        return allProjects;
    }

    async updateProject(projectId: string, data: ProjectDTO) {
        const projectExists = await this.prisma.project.findUnique({
            where: {
                projectId,
            }
        })

        if(!projectExists) {
            throw new Error('Project does not exist!')
        }

        const updateProject = await this.prisma.project.update({
            where: {
                projectId,
            },
            data: {
                ...data,
            }
        })
        return updateProject;
    }

    async deleteProject(projectId: string){

        const projectExists = await this.prisma.project.findUnique({
            where: {
                projectId,
            }
        })

        if(!projectExists) {
            throw new Error('Project does not exist!')
        }

        return await this.prisma.project.delete({
            where: {
                projectId,
            }
        })
    }
}
