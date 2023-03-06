import { Controller } from '@nestjs/common';
import { ApplyService } from './apply.service';

@Controller('apply')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}
}
