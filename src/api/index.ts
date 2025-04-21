

/*
ADMIN ROUTES 
*/
import { Application, Request, Response } from 'express'
import { CustomResponse as ApiResponse } from '../lib/api-response';
import { StatusCodes } from 'http-status-codes/build/cjs';



import AdminSuperAdminRoutes from './modules/admin/super-admin/route'
import AdminPersonRoutes from './modules/admin/person/route';



const api = (app: Application) => {
    app.use('/status', (req: Request, res: Response) => {
        ApiResponse.success({
            message: "TEST MESSAGE",
            code: StatusCodes.OK,
            data: {},
            res
        })
    });



    /*
        ADMIN ROUTES IMPLEMENTATION
    */
    app.use('/admin/super-admin', AdminSuperAdminRoutes);
    app.use('/admin/person', AdminPersonRoutes);
}


export default api