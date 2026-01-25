import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors, Version } from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express'

@Controller({version: '2'})
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Version('2')
  @UseInterceptors(FileInterceptor('file'))
  @Post('/file')
  uploadFile(@UploadedFile(new ParseFilePipe({
    validators: [
      new FileTypeValidator({
        fileType: /\/(jpg|jpeg|png|webp|gif|mp4)$/,
      }),
      new MaxFileSizeValidator({
        maxSize: 1000 * 1000 * 10,
        message: 'you can`t upload file bigger than 10 MB'
      })
    ]
  })) file: Express.Multer.File) {
    return this.fileService.upload(file)
  }
}
