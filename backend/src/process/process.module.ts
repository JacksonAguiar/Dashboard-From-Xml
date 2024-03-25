import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';
import { diskStorage } from 'multer';
import * as path from 'path';

const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const fileName = file.originalname.split('.')[0] + '-' + Date.now();

      const extension = path.parse(file.originalname).ext;
      cb(null, `${fileName}${extension}`);
    },
  }),
};
@Module({
  imports: [MulterModule.register(multerConfig)],
  controllers: [ProcessController],
  providers: [ProcessService],
})
export class ProcessModule {}
