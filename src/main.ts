import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const fileGprcOption: MicroserviceOptions = {
    transport: Transport.GRPC,
    options: {
      package: 'file',
      protoPath: join(__dirname, 'proto/file.proto'),
      url: `0.0.0.0:${
        process.env.FILE_GRPC_PORT ? parseInt(process.env.FILE_GRPC_PORT) : 8086
      }`,
    },
  };
  app.connectMicroservice(fileGprcOption);

  await app.startAllMicroservices();
}
bootstrap();
