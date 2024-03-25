import { ProcessService } from './process.service';
import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConvertSheetToObj } from '../utils';

@Controller('metrics')
export class ProcessController {
  constructor(private readonly appService: ProcessService) {}

  @Get()
  async getMetrics() {
    return await this.appService.readFile();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  processMetrics(@UploadedFile() file: Express.Multer.File) {
    const data = ConvertSheetToObj(file.path);

    return this.appService.generateMetrics(data);
  }
}
