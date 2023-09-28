import { MulterField, MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ApiConsumes } from "@nestjs/swagger";


export const ApiFile = (  fieldName : string  , localOptions : MulterOptions = {} ) => {
  return applyDecorators(UseInterceptors(FileInterceptor(fieldName, localOptions)), ApiConsumes("multipart/form-data"));
}

export const ApiFiles = (  fieldName : string , maxCount : number  , localOptions : MulterOptions = {} ) => {
  return applyDecorators(UseInterceptors(FilesInterceptor(fieldName, maxCount, localOptions)), ApiConsumes("multipart/form-data"));
}


export const ApiFileFields = (  uploadFields : MulterField[]  , localOptions : MulterOptions = {} ) => {
  return applyDecorators(UseInterceptors(FileFieldsInterceptor(uploadFields, localOptions)), ApiConsumes("multipart/form-data"));
}



