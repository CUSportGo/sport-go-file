/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "file";

export interface ImageData {
  filename: string;
  data: Uint8Array;
}

export interface ImageURL {
  url: string;
  filename: string;
}

export interface UploadFileRequest {
  filename: string;
  data: Uint8Array;
  userId: string;
}

export interface UploadFileResponse {
  url: string;
  filename: string;
}

export interface UploadMultipleFileRequest {
  images: ImageData[];
  userId: string;
}

export interface UploadMultipleFileResponse {
  imageUrls: ImageURL[];
}

export interface GetSignedURLRequest {
  filename: string;
  userId: string;
}

export interface GetSignedURLResponse {
  url: string;
}

export const FILE_PACKAGE_NAME = "file";

export interface FileServiceClient {
  uploadFile(request: UploadFileRequest): Observable<UploadFileResponse>;

  uploadMultipleFile(request: UploadMultipleFileRequest): Observable<UploadMultipleFileResponse>;

  getSignedUrl(request: GetSignedURLRequest): Observable<GetSignedURLResponse>;
}

export interface FileServiceController {
  uploadFile(
    request: UploadFileRequest,
  ): Promise<UploadFileResponse> | Observable<UploadFileResponse> | UploadFileResponse;

  uploadMultipleFile(
    request: UploadMultipleFileRequest,
  ): Promise<UploadMultipleFileResponse> | Observable<UploadMultipleFileResponse> | UploadMultipleFileResponse;

  getSignedUrl(
    request: GetSignedURLRequest,
  ): Promise<GetSignedURLResponse> | Observable<GetSignedURLResponse> | GetSignedURLResponse;
}

export function FileServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["uploadFile", "uploadMultipleFile", "getSignedUrl"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("FileService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("FileService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const FILE_SERVICE_NAME = "FileService";
