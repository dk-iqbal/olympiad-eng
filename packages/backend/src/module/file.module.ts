// upload.module.ts
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
    imports: [
        MulterModule.register({
            limits: {
                fileSize: 5 * 1024 * 1024
            },
            storage: diskStorage({
                destination: '../uploads',
                filename: (req, file, callback) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    return callback(null, `${randomName}${extname(file.originalname)}`);
                },
            }),
        }),
    ],
    exports: [MulterModule],
})
export class UploadModule { }
