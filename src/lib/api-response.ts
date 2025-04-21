import Config from '../config';
import { StatusCodes } from 'http-status-codes';
import { ISuccessResponse, TMessageObject, IBaseResponse, IFailedResponse } from 'index';
import _ from 'lodash';
import { ValidationError } from "express-validator/lib";
import { CustomError } from './customError';

function isTMessageObject(obj: any): obj is TMessageObject {
	return (
		obj !== null &&
		typeof obj === 'object' &&
		('message' in obj || 'data' in obj || 'code' in obj || 'extra' in obj)
	);
}
export class CustomResponse {
	static success({ res, message, data, code, extra }: ISuccessResponse) {
		const resObj: IBaseResponse<Record<null, null>> = { success: true, message: '', code: 200 };

		if (isTMessageObject(message)) {
			resObj.message = message.message || 'success';
			resObj.data = message.data || {};
			resObj.code = message.code || StatusCodes.OK;
			if (!_.isEmpty(message.extra) && _.isObjectLike(message.extra)) {
				resObj.extra = message.extra;
			}
		} else {
			resObj.message = message || 'success';
			resObj.data = data || null;
			resObj.code = code || StatusCodes.OK;
			if (!_.isEmpty(extra) && _.isObjectLike(extra)) {
				resObj.extra = extra;
			}
		}

		if (resObj.extra && resObj.extra.pagination) {
			resObj.extra.pagination.currentPage = resObj.extra.pagination.offset / resObj.extra.pagination.limit + 1;
			resObj.extra.pagination.nextPage =
				resObj.extra.pagination.rows > resObj.extra.pagination.offset + resObj.extra.pagination.limit
					? resObj.extra.pagination.currentPage + 1
					: null;
			delete resObj.extra.pagination.offset;
		}

		if (_.isObjectLike(resObj.data)) {
			resObj.data = JSON.parse(JSON.stringify(resObj.data));
		}
		// resObj.data = changeBucketUrl(resObj.data);
		if (res.req.headers.json) {
			res
				.status(resObj.code)
				.type('json')
				.send(`${JSON.stringify(resObj, null, 2)}\n`);
		} else {
			res.status(resObj.code).json(resObj);
		}
	}

	static fail({ res, message, code = StatusCodes.NOT_FOUND, resCode = StatusCodes.NOT_FOUND, extra = {} }: IFailedResponse) {
		const resObj: IBaseResponse<Record<null, null>> = { success: false, message: '', code: 200};

		if (isTMessageObject(message)) {
			resObj.message = message.message || 'failed';
			resObj.errors = [{ msg: resObj.message }];
			resObj.code = message.code || StatusCodes.NOT_FOUND;
			resObj.resCode = message.resCode || resObj.code;
			if (!_.isEmpty(message.extra) && _.isObjectLike(message.extra)) {
				resObj.extra = message.extra;
			}
		} else {
			resObj.message = message || 'failed';
			resObj.errors = [{ msg: resObj.message }];
			resObj.code = code || StatusCodes.NOT_FOUND;
			resObj.resCode = resCode || resObj.code;
			if (!_.isEmpty(extra) && _.isObjectLike(extra)) {
				resObj.extra = extra;
			}
		}

		if (res.req.headers.json) {
			res
				.status(resObj.code)
				.type('json')
				.send(`${JSON.stringify(resObj, null, 2)}\n`);
		} else {
			res.status(resObj.code).json(resObj);
		}
	}
	static expressValidationFail({ res, message, code = StatusCodes.NOT_FOUND, resCode = StatusCodes.NOT_FOUND, extra = {} }: IFailedResponse<ValidationError[], ValidationError[]>) {
		const resObj: IBaseResponse<Record<null, null>> = { message: '', data: {}, code: 200, extra: {} };

		if (isTMessageObject(message)) {
			resObj.message = message[0].msg ?? 'Validation Failed';
			resObj.data = message;
			resObj.code = message.code || StatusCodes.NOT_FOUND;
			resObj.resCode = message.resCode || resObj.code;
			if (!_.isEmpty(message.extra) && _.isObjectLike(message.extra)) {
				resObj.extra = message.extra;
			}
		}

		if (res.req.headers.json) {
			res
				.status(resObj.code)
				.type('json')
				.send(`${JSON.stringify(resObj, null, 2)}\n`);
		} else {
			res.status(resObj.code).json(resObj);
		}
	}

	static createError({ customErr, systemError = null }: {
		customErr: IBaseResponse<string, string>,
		systemError?: null | IBaseResponse<string, string>
	}) {
		if (systemError && Config.IsLocal) {
			return new CustomError({
				message: systemError.message,
				code: StatusCodes.UNPROCESSABLE_ENTITY,
				resCode: systemError.resCode,
				extra: systemError.extra,
			});
		}

		return new CustomError({
			message: customErr.message,
			code: customErr.code,
			resCode: customErr.resCode,
			extra: customErr.extra,
			name: customErr.name,
		});

	}

}

