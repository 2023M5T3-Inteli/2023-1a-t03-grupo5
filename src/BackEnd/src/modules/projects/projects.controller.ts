/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Param, Delete, Get, Put } from '@nestjs/common';
import { ProjectDTO } from './dto/Project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() data: ProjectDTO) {
    return this.projectsService.createProject(data);
  }

  @Get()
  async findAll() {
    return this.projectsService.getAllProjects()
  }

  @Put(":projectId")
  async update(@Param("projectId") projectId: string, @Body() data: ProjectDTO) {
    return this.projectsService.updateProject(projectId, data);
  }

  @Delete(":projectId")
  async delete(@Param("projectId") projectId: string) {
    return this.projectsService.deleteProject(projectId);
  }
}

