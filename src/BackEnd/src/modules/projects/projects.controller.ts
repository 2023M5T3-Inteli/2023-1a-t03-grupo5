/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Param, Delete, Get, Put, Req } from '@nestjs/common';
import { ProjectDTO } from './dto/Project.dto';
import { ProjectsService } from './projects.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Project')
@Controller('Project')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post("/create")
  async create(@Body() data: ProjectDTO) {
    console.log(data.blockedSubscription);
    return this.projectsService.createProject(data);
  }

  @Get("/findAll")
  async findAll() {
    return this.projectsService.getAllProjects()
  }

  @Get("/findByID/:projectId")
  async findOne(@Param("projectId") projectId: string){
    return this.projectsService.getProjectById(projectId);
  }

  @Put("/update/:projectId")
  async update(@Param("projectId") projectId: string, @Body() data: ProjectDTO) {
    return this.projectsService.updateProject(projectId, data);
  }

  @Delete("/delete/:projectId")
  async delete(@Param("projectId") projectId: string) {
    return this.projectsService.deleteProject(projectId);
  }

  @Get("/filter")
  async filter(@Body() data: any) {
    return this.projectsService.filterProject(data);
  }

  @Put("/approve/:projectId")
  async approve(@Req() req: any, @Param("projectId") projectId: string) {
    return this.projectsService.approveProject(projectId, req.user.id);
  }

  @Put("/cancel/:projectId")
  async cancel(@Req() req: any, @Param("projectId") projectId: string) {
    return this.projectsService.cancelProject(projectId, req.user.id);
  }
}

