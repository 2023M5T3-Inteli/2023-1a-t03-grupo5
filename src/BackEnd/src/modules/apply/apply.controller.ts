import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApplyService } from './apply.service';
import { createApplyDTO } from './DTOs/createApply.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Apply')
@Controller('Apply')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @Post()
  async apply(@Body() data: createApplyDTO) {
    return await this.applyService.apply(data);
  }

  @Get("/getProjectId/:projectId")
  async getApplyByProjectId(@Param() projectId: string) {
    return await this.applyService.getApplyByProjectId(projectId);
  }

  @Get("/getUserId/:userId")
  async getApplyByUserId(@Param() userId: string) {
    return await this.applyService.getApplyByUserId(userId);
  }

  @Delete(":id")
  async deleteApply(@Param() id: string) {
    return await this.applyService.deleteApply(id);
  }


}
