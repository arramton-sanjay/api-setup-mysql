import { StatusCodes } from 'http-status-codes';

export class CustomError extends Error {
  code: number;
  resCode: number;
  extra: Record<string, any>;

  constructor({
    message,
    code = StatusCodes.UNPROCESSABLE_ENTITY,
    resCode,
    extra = {},
    name = 'CustomError',
  }: {
    message: string;
    code?: number;
    resCode?: number;
    extra?: Record<string, any>;
    name?: string;
  }) {
    super(message);
    this.name = name;
    this.code = code;
    this.resCode = resCode ?? code;
    this.extra = extra;

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
