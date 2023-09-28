import { HttpException } from "@nestjs/common";

export interface IError {
  status: number;
  message: string;
}


export class ApiException extends HttpException {
  constructor(error: IError, message?: string) {
    super(error.message, error.status);
    this.message = message || error.message;
  }
}
