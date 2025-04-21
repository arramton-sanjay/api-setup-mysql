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
export interface IBaseResponse<T = Record<string, any> | any[], M = string> {
    status?: boolean;
    success?: boolean;
    name?: string;
    message: M;
    data?: T;
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
    resCode?: number,
}


export interface IReponseControllerFn<T> {
    data:  T | T[] | Record<string, null>,
    status: boolean,
    code: number,
    message: string,
    extra?: {
        page: number | string,
        limit: number | string,
        [key: string]: boolean | number | string;
    }
}

export interface Iextra {
    page?: number | string,
    limit?: number | string,
    [key: string]: boolean | number | string | undefined;
}
export interface IReponseServiceFn<T> {
    data: T | T[],
    status: boolean,
    extra?: Iextra
}

export interface IPaginationExtra {
    page: number | string | undefined,
    limit: number | string | undefined,
    total?: number | string | undefined,
    getTotal?: boolean,
    withGroup?: boolean,
    withOutData?: boolean,
    [key: string]: boolean | number | string | undefined
}
export interface IPaginationResponse<T> {
    data: T[],
    extra: IPaginationExtra
}