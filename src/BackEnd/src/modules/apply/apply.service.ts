import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { createApplyDTO } from './DTOs/createApply.dto';
import { BadRequestException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common/exceptions';

@Injectable()
export class ApplyService {
    constructor (private readonly prisma: PrismaService) {}

    async apply(data: createApplyDTO) {
        //verify if the user is already applied to the project
        const alreadyApplied = await this.prisma.apply.findMany({
            where: {
                userId: data.userId,
                projectId: data.projectId
            }
        });

        if (alreadyApplied) {
            throw new BadRequestException("Something bad happened", {cause: new Error(), description: "User already exists"})
        }

    }

    
}
