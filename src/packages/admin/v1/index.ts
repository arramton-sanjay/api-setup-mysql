

/*
  V1 ADMIN ROUTES 
*/
import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CustomResponse as ApiResponse } from '../../../lib/api-response';
import { Message } from '../../../lib/Messages';
const router = Router();

router.get('/status', (req: Request, res: Response) => {
    ApiResponse.success({
        message: Message.api_status.message,
        code: StatusCodes.OK,
        data: {
            headers: req.headers,
            params: req.params,
            query: req.query,
            body: req.body,
        },
        res
    })
});
export default router;