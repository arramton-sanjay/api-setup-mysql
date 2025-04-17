import { Response, Request } from "express";
import { TRequestResponse } from "index";

export default class SuperAdminController {
    static async save(req: Request, res: Response ) {
        const response = { data: {}, message: "RANDOM", code: 200 };
        try {
            res.send(response);
        } catch (error) {
            response.message = 'TEST ERROR';
            response.code = 500
            res.send({ message: "ERROR", })
        }
    }
}
