import { Controller, Post } from '@nestjs/common';
import { ApplyService } from './apply.service';
import { createApplyDTO } from './DTOs/createApply.dto';

@Controller('apply')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @Post()
  async apply(data: createApplyDTO) {
    return await this.applyService.apply(data);
  }
}
