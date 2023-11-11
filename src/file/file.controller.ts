import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { throws } from 'assert';
import {
  GetSignedURLRequest,
  GetSignedURLResponse,
  GetSportAreaImageURLRequest,
  GetSportAreaImageURLResponse,
  UploadFileRequest,
  UploadFileResponse,
  UploadMultipleFileRequest,
  UploadMultipleFileResponse,
} from './file.pb';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}

  @GrpcMethod('FileService', 'UploadFile')
  uploadFile(request: UploadFileRequest): Promise<UploadFileResponse> {
    return this.fileService.uploadFile(request);
  }

  @GrpcMethod('FileService', 'UploadMultipleFile')
  uploadMultipleFile(
    request: UploadMultipleFileRequest,
  ): Promise<UploadMultipleFileResponse> {
    return this.fileService.uploadMultipleFile(request);
  }

  @GrpcMethod('FileService', 'GetSignedURL')
  getSignedUrl(request: GetSignedURLRequest): Promise<GetSignedURLResponse> {
    return this.fileService.getSignedUrl(request);
  }

  @GrpcMethod('FileService', 'GetSportAreaImageURL')
  getSportAreaImageUrl(
    request: GetSportAreaImageURLRequest,
  ): Promise<GetSportAreaImageURLResponse> {
    return this.fileService.getSportAreaImageUrl(request);
  }
}
