import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { v4 as uuidv4 } from "uuid"
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  async deleteFiles(folder: string, fileName: string) {
    fs.unlink(
      path.join(process.cwd(), '..', 'uploads', folder, fileName),
      (err) => {
        if (err) {
          return new InternalServerErrorException();
        }
      },
    );
  }
  async saveFile(file: Express.Multer.File, folder): Promise<string> {
    if (!file) {
      throw new HttpException('Fayl mavjud emas', HttpStatus.BAD_REQUEST);
    }
    const filename = uuidv4() + '.' + file.originalname.split('.').pop();
    const filePath = path.join(process.cwd(), '..', 'uploads', folder, filename);
    await this.saveFileToDisk(filePath, file.buffer);
    return filename;
  }

  private async saveFileToDisk(filePath: string, fileBuffer: Buffer): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, fileBuffer, err => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}
