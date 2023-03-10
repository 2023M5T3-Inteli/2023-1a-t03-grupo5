import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApplyService } from './apply.service';
import { createApplyDTO } from './DTOs/createApply.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Apply')
@Controller('Apply')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @Post('/create')
  async apply(@Body() data: createApplyDTO) {
    return await this.applyService.apply(data);
  }

  @Get('/projects/:projectId')
  async getApplyByProjectId(@Param() projectId: string) {
    return await this.applyService.getApplyByProjectId(projectId);
  }

  @Get('/users/:userId')
  async getApplyByUserId(@Param() userId: string) {
    return await this.applyService.getApplyByUserId(userId);
  }

  @Delete('/delete/:id')
  async deleteApply(@Param() id: string) {
    return await this.applyService.deleteApply(id);
  }

  @Put('/update/:id')
  async updateApply(@Param() id: string, @Body() data: createApplyDTO) {
    return await this.applyService.updateApply(id, data);
  }

  @Put('/updateFeedback/:id')
  async updateFeedback(@Param() id: string, @Body() feedback: string) {
    return await this.applyService.createFeedback(id, feedback);
  }
}
