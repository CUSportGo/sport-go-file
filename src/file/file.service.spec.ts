import { Test, TestingModule } from '@nestjs/testing';
import { GCSClient } from '../client/gcs.client';
import { FileRepository } from '../repository/file.repository';
import { FileService } from './file.service';

describe('FileService', () => {
  let service: FileService;

  const mockFileRepo = {};
  const mockGCSClient = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        {
          provide: FileRepository,
          useValue: mockFileRepo,
        },
        {
          provide: GCSClient,
          useValue: mockGCSClient,
        },
      ],
    }).compile();

    service = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
