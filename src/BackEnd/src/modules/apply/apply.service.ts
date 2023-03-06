import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class ApplyService {
    constructor (private readonly prisma: PrismaService) {}

    async createApply(data) {
        return await this.prisma.apply.create({
            data: {
                ...data
            }
        })
    }

    
}
