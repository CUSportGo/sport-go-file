import { Module } from '@nestjs/common';
import { GCSClient } from '../client/gcs.client';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { FileRepository } from '../repository/file.repository';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [PrismaModule],
  controllers: [FileController],
  providers: [FileService, FileRepository, GCSClient],
})
export class FileModule {}
