import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { createApplyDTO } from './DTOs/createApply.dto';
import {
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ApplyService {
  constructor(private readonly prisma: PrismaService) {}

  async apply(infos: createApplyDTO) {
    //verify if the user is already applied to the project
    const alreadyApplied = await this.prisma.apply.findMany({
      where: {
        userId: infos.userId,
        projectId: infos.projectId,
      },
    });

    console.log(alreadyApplied);

    if (alreadyApplied.length > 0) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Application already exists',
      });
    }

    //create the apply
    try {
      await this.prisma.apply.create({
        data: {
          id: uuid(),
          userId: infos.userId,
          projectId: infos.projectId,
          offerName: infos.offerName,
          why: infos.why,
          which: infos.which,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException('Something bad happened', {
        cause: new Error(),
        description: err,
      });
    }

    return 'Application created successfully';
  }

  async getApplyByProjectId(projectId: string) {
    const apply = await this.prisma.apply.findMany({
      where: {
        projectId,
      },
    });

    return apply;
  }

  async getApplyByUserId(userId: string) {
    const apply = await this.prisma.apply.findMany({
      where: {
        userId,
      },
    });

    return apply;
  }

  async deleteApply(id: string) {
    //verify if the apply exists
    const applyExists = await this.prisma.apply.findUnique({
      where: {
        id,
      },
    });

    if (!applyExists) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Application does not exist',
      });
    }

    try {
      await this.prisma.apply.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException('Something bad happened', {
        cause: new Error(),
        description: err,
      });
    }

    return 'Application deleted successfully';
  }

  async updateApply(id: string, data: any) {
    //verify if the apply exists
    const applyExists = await this.prisma.apply.findUnique({
      where: {
        id,
      },
    });

    if (!applyExists) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Application does not exist',
      });
    }

    try {
      await this.prisma.apply.update({
        data,
        where: {
          id: id,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException('Something bad happened', {
        cause: new Error(),
        description: err,
      });
    }

    return 'Application updated successfully';
  }

  async createFeedback(id: string, feedback: string) {
    const applyExists = await this.prisma.apply.findUnique({
      where: {
        id,
      },
    });

    if (!applyExists) {
      throw new BadRequestException('Something bad happened', {cause: new Error(), description: 'Application does not exist'});
    }

    try {
      await this.prisma.apply.update({
        data: {
          feedback: feedback,
        },
        where: {
          id: id,
        },
      });
    } catch (err) {
      throw new InternalServerErrorException('Something bad happened', {cause: new Error(), description: err});
    }
  }
}
