import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaService } from '../prisma/prisma.service';
import { AddPhotoDto } from './add-photo.dto';

@Injectable()
export class PhotosService {
  constructor(private readonly prisma: PrismaService) {}

  async upload(file: Express.Multer.File, dto: AddPhotoDto) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado.');
    }

    const uploadResult = await this.uploadToCloudinary(file);
    return this.saveToDatabase(uploadResult.secure_url, dto.guestName);
  }

  private async uploadToCloudinary(
    file: Express.Multer.File,
  ): Promise<{ secure_url: string }> {
    try {
      return await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'wedding-gallery',
            transformation: [{ width: 1600, crop: 'limit', quality: 'auto:good' }],
          },
          (err, result) => {
            if (err || !result) return reject(err);
            resolve(result);
          },
        );
        stream.end(file.buffer);
      });
    } catch (err) {
      throw new InternalServerErrorException(
        'Falha ao enviar a foto para o Cloudinary.',
      );
    }
  }

  private async saveToDatabase(url: string, guestName?: string) {
    try {
      return await this.prisma.photo.create({
        data: { url, guestName },
      });
    } catch (err) {
      throw new InternalServerErrorException(
        'Falha ao salvar a foto no banco de dados.',
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.photo.findMany({
        orderBy: { createdAt: 'desc' },
      });
    } catch (err) {
      throw new InternalServerErrorException('Falha ao buscar as fotos.');
    }
  }
}