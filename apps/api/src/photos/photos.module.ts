import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { cloudinaryProvider } from 'src/cloudinary/cloudinary.provide';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService, cloudinaryProvider],
})
export class PhotosModule {}