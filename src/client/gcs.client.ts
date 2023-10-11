import { Bucket, Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { Stream } from 'stream';
import storageConfig from '../config/google-cloud-config';

@Injectable()
export class GcsClient {
  private storage: Storage;
  private bucketName: string;
  private bucket: Bucket;

  constructor() {
    this.storage = new Storage({
      projectId: storageConfig.projectId,
      credentials: {
        client_email: storageConfig.client_email,
        private_key: storageConfig.private_key,
      },
    });
    this.bucketName = storageConfig.mediaBucket;
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
        // save on db
      });
    } catch (error) {
      console.log(error);
    }
  }
}
