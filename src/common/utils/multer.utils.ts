import { UploadTypesEnum } from '@/common/enums/upload-types.enum';
import { HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import * as process from 'process';

export class MulterUtils {
  /**
   * Config for allowed files
   *
   * @static
   * @param {UploadTypesEnum} filesAllowed - Allowed files
   * @returns
   * @memberof MulterUtils
   */
  static getConfig(filesAllowed: UploadTypesEnum) {
    return {
      // Enable file size limits
      // limits: {
      //   fileSize: +process.env.MAX_FILE_SIZE * 1024 * 1024,
      // },
      // Check the mimetypes to allow for upload
      fileFilter: (req: any, file: any, cb: any) => {
        console.log(file.mimetype);
        if (file.mimetype.match(`/(${filesAllowed})$`)) {
          // Allow storage of file
          cb(null, true);
        } else {
          // Reject file
          cb(
            new HttpException(
              `Unsupported file type ${extname(file.originalname)}`,
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
      },
      // Storage properties
      storage: diskStorage({
        // Destination storage path details
        destination: (req: any, file: any, cb: any) => {
          const uploadPath = process.env.UPLOAD_LOCATION;
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        },
        // File modification details
        filename: (req: any, file: any, cb: any) => {
          // Calling the callback passing the random name generated with
          // the original extension name
          cb(null, `${uuid()}.${extname(file.originalname).split('.').pop()}`);
        },
      }),
    };
  }

  static deleteFile(image: string) {
    if (existsSync(`${process.env.UPLOAD_LOCATION}/${image}`)) {
      fs.unlinkSync(`${process.env.UPLOAD_LOCATION}/${image}`);
    }
  }
}
