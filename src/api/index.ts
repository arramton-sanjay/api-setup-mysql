

/*
ADMIN ROUTES 
*/
import { Application, Request, Response } from 'express'
import AdminSuperAdminRoutes from './modules/admin/super-admin/route'
import { CustomResponse as ApiResponse } from '../lib/api-response';
import { StatusCodes } from 'http-status-codes/build/cjs';



const api = (app: Application) => {
    app.use('/status', (req: Request, res: Response) => {
        ApiResponse.success({
            message: "TEST MESSAGE",
            code: StatusCodes.OK,
            data: null,
            res
        })
    });



    /*
        ADMIN ROUTES IMPLEMENTATION
    */
    app.use('/admin/super-admin', AdminSuperAdminRoutes)
}


export default api