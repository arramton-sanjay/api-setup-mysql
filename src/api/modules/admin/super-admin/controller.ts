import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes/build/cjs";
import { CustomResponse } from "../../../../lib/api-response";
import { IBaseResponse } from "index";

export default class SuperAdminController {
    static async save(req: Request, res: Response) {
        const response: IBaseResponse<null, string> = {
            data: null,
            message: "RANDOM",
            code: StatusCodes.OK,
        };
        try {

            throw CustomResponse.createError({
                customErr: {
                    message: 'Failed due to some unwanted reason',
                    code: StatusCodes.BAD_REQUEST,
                    name: 'CustomValidationError',
                    data: null
                }
            });;


            res.status(response.code).json(response);

        } catch (error: any) {
            return CustomResponse.fail({
                res,
                message: error.message || 'Something went wrong',
                code: error.code || StatusCodes.INTERNAL_SERVER_ERROR,
                resCode: error.resCode || StatusCodes.INTERNAL_SERVER_ERROR,
                extra: error.extra || {}
            });
        }
    }
}
