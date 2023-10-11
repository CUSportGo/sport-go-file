import { Injectable } from '@nestjs/common';
import { PrismaClient, File } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FileRepository {
  constructor(private db: PrismaService) {}

  async create(createFile: Prisma.FileCreateInput): Promise<File> {
    return await this.db.file.create({
      data: createFile,
    });
  }
}
