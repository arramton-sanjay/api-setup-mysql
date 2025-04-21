
import { StatusCodes } from 'http-status-codes';
enum MessageEnums {
    DATA_SAVED = 'dataSaved',
    DATA_NOT_SAVED = 'dataNotSaved',
    DATA_FOUND = 'dataFound',
    DATA_NOT_FOUND = 'dataNotFound',
    DATA_DELETED = 'dataDeleted',
    DATA_NOT_DELETED = 'dataNotDeleted',
}

interface ErrorObj {
    name: string,
    message: string,
    code: StatusCodes
}
export const Message: Record<MessageEnums, ErrorObj> = {
    [MessageEnums.DATA_SAVED]: {
        code: StatusCodes.OK,
        message: 'Data Saved Successfully',
        name: MessageEnums.DATA_SAVED
    },
    [MessageEnums.DATA_NOT_SAVED]: {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Data failed to save',
        name: MessageEnums.DATA_NOT_SAVED
    },
    [MessageEnums.DATA_NOT_FOUND]: {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Data not found',
        name: MessageEnums.DATA_NOT_FOUND
    },
    [MessageEnums.DATA_FOUND]: {
        code: StatusCodes.OK,
        message: 'Data found',
        name: MessageEnums.DATA_FOUND
    },
    [MessageEnums.DATA_DELETED]: {
        code: StatusCodes.OK,
        message: 'Data Delete Successfully',
        name: MessageEnums.DATA_DELETED
    },
    [MessageEnums.DATA_NOT_DELETED]: {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Failed to delete data',
        name: MessageEnums.DATA_NOT_DELETED
    },
} 