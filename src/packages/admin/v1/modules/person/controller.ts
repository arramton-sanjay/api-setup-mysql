import { Request, Response } from "express";
import { CustomResponse } from "../../../../../lib/api-response";
import { StatusCodes } from 'http-status-codes';
import { Message } from "../../../../../lib/Messages";
import PersonService from "../../services/person";
import { IReponseControllerFn, IReponseServiceFn } from "src/types";
import { TUser } from "src/types/user";
export default class PersonController {
    static async list(req: Request, res: Response) {
        try {
            const response: IReponseControllerFn<TUser> = { data: [], status: false, code: Message.dataNotFound.code, message: Message.dataNotFound.message, extra: { page: 1, limit: 20 } };
            const srvRes: IReponseServiceFn<TUser> = await PersonService.list({
                id: req.query.id?.toString(),
                page: req.query.page ? Number(req.query.page) : 1,
                limit: req.query.limit ? Number(req.query.limit) : 20
            });
            if (Array.isArray(srvRes.data) && srvRes.data.length) {
                response.status = true;
                response.data = srvRes.data;
                response.code = Message.dataFound.code;
                response.message = Message.dataFound.message
            }

            CustomResponse.success({ res, ...response })
        } catch (error: any) {
            CustomResponse.fail({
                res,
                message: error.message || 'Something went wrong',
                code: error.code || StatusCodes.INTERNAL_SERVER_ERROR,
                resCode: error.resCode || StatusCodes.INTERNAL_SERVER_ERROR,
                extra: error.extra || {}
            });
        }
    }

    static async save(req: Request, res: Response) {
        const t = await global.knexInstance.transaction()
        const response: IReponseControllerFn<TUser> = { data: {}, status: false, code: Message.dataNotSaved.code, message: Message.dataNotSaved.message };
        try {
            const srvRes = await PersonService.save({ email: req.body.email, name: req.body.name }, t);
            if (srvRes.status) {
                await t.commit();
                const savedDoc = (await PersonService.list({ id: typeof srvRes.data === 'number' ? srvRes.data : '' }))?.data
                response.status = true;
                response.data = Array.isArray(savedDoc) ? savedDoc[0] : savedDoc;
                response.message = Message.dataSaved.message;
                response.code = Message.dataSaved.code
            }
            CustomResponse.success({ res, ...response })
        } catch (error: any) {
            await t.rollback();
            CustomResponse.fail({
                res,
                message: error.message || 'Something went wrong',
                code: error.code || StatusCodes.INTERNAL_SERVER_ERROR,
                resCode: error.resCode || StatusCodes.INTERNAL_SERVER_ERROR,
                extra: error.extra || {}
            });
        }
    }

    static async delete(req: Request, res: Response) {
        const t = await global.knexInstance.transaction()
        const response = { data: {}, status: false, code: Message.dataNotDeleted.code, message: Message.dataNotDeleted.message };
        try {
            const srvRes = await PersonService.delete({ ids: req.body.ids }, t);
            if (srvRes.status) {
                response.status = true;
                response.data = {
                    ids: req.body.ids
                }
                response.message = Message.dataDeleted.message;
                response.code = Message.dataDeleted.code
            }

            await t.commit();
            CustomResponse.success({ res, ...response })
        } catch (error: any) {
            await t.rollback();
            CustomResponse.fail({
                res,
                message: error.message || 'Something went wrong',
                code: error.code || StatusCodes.INTERNAL_SERVER_ERROR,
                resCode: error.resCode || StatusCodes.INTERNAL_SERVER_ERROR,
                extra: error.extra || {}
            });
        }
    }
}