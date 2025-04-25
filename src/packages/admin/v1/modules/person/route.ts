import { Router } from 'express';
import PersonController from "./controller";

const AdminPersonRoutes = Router();

AdminPersonRoutes.get('/list', PersonController.list)
AdminPersonRoutes.post('/save', PersonController.save)
AdminPersonRoutes.post('/delete', PersonController.delete)


export default AdminPersonRoutes