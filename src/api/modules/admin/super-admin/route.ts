import SuperAdminController from "./controller";
import { Router } from 'express';

const router = Router();

router.post('/save', SuperAdminController.save)


export default router 