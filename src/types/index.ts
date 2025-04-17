import { Response } from "express";

export interface Error {
    msg: string
}
export interface IPagination {
    offset: number;
    limit: number;
    rows: number;
    currentPage?: number;
    nextPage?: number | null;
}
export interface IBaseResponse<T = string, M = string> {
    status?: boolean;
    success?: boolean;
    name?: string;
    message: M;
    data: T;
    code: number;
    resCode?: number;
    extra?: {
        pagination?: IPagination
        [key: string]: any
    };
    errors?: Error[];
}
export interface TMessageObject<T = string> extends IBaseResponse<T> {
    status: boolean,
}
export interface ISuccessResponse extends IBaseResponse {
    res: Response;
}
export interface IFailedResponse<T = string, M = string> extends IBaseResponse<T, M> {
    res: Response;
    resCode: number,
}

