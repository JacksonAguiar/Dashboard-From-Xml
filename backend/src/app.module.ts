import { Module } from '@nestjs/common';
// import { MulterModule } from '@nestjs/platform-express';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { diskStorage } from 'multer';
// import * as path from 'path';
import { ProcessModule } from './process/process.module';

// const multerConfig = {
//   storage: diskStorage({
//     destination: './uploads',
//     filename: (req, file, cb) => {
//       const fileName = file.originalname.split('.')[0] + '-' + Date.now();

//       const extension = path.parse(file.originalname).ext;
//       cb(null, `${fileName}${extension}`);
//     },
//   }),
// };

@Module({
  imports: [ProcessModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
