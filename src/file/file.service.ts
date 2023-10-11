import { status } from '@grpc/grpc-js';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { GCSClient } from '../client/gcs.client';
import { FileRepository } from '../repository/file.repository';
import {
  FileServiceController,
  GetSignedURLRequest,
  GetSignedURLResponse,
  UploadFileRequest,
  UploadFileResponse,
} from './file.pb';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService implements FileServiceController {
  constructor(private fileRepo: FileRepository, private gcsClient: GCSClient) {}

  async uploadFile(request: UploadFileRequest): Promise<UploadFileResponse> {
    try {
      await this.gcsClient.upload(request.filename, request.data);

      const fileId = uuidv4();
      await this.fileRepo.create({
        id: fileId,
        filename: request.filename,
        ownerId: request.userId,
      });

      const url = await this.gcsClient.getSignedURL(request.filename);
      return { url: url };
    } catch (error) {
      console.log(error);
      if (!(error instanceof RpcException)) {
        throw new RpcException({
          code: status.INTERNAL,
          message: 'Internal server error',
        });
      }
      throw error;
    }
  }
  getSignedUrl(request: GetSignedURLRequest): Promise<GetSignedURLResponse> {
    throw new Error('Method not implemented.');
  }
}
