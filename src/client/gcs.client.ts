import { Bucket, GetSignedUrlConfig, Storage } from '@google-cloud/storage';
import { status } from '@grpc/grpc-js';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Stream } from 'stream';

@Injectable()
export class GCSClient {
  private storage: Storage;
  private bucketName: string;
  private bucket: Bucket;

  constructor() {
    this.storage = new Storage({
      keyFilename: 'gcs-service-account.json',
    });
    this.bucketName = process.env.STORAGE_MEDIA_BUCKET;
    this.bucket = this.storage.bucket(this.bucketName);
  }

  async upload(filename: string, fileContent: any) {
    const file = this.bucket.file(filename);

    const passthroughStream = new Stream.PassThrough();
    passthroughStream.write(fileContent);
    passthroughStream.end();

    try {
      passthroughStream.pipe(file.createWriteStream()).on('finish', () => {
        console.log('finish');
      });
    } catch (error) {
      console.log(error);
      throw new RpcException({
        code: status.INTERNAL,
        message: 'Internal server error',
      });
    }
  }

  async getSignedURL(filename: string) {
    try {
      const options: GetSignedUrlConfig = {
        version: 'v2',
        action: 'read',
        expires: Date.now() + 1000 * 60 * 15,
      };

      const file = this.bucket.file(filename);
      const [url] = await file.getSignedUrl(options);
      return url;
    } catch (error) {
      throw new RpcException({
        code: status.INTERNAL,
        message: 'Internal server error',
      });
    }
  }
}
