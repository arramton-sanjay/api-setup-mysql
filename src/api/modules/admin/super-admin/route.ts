import { validations } from "../../../middleware/validations/sample";
import SuperAdminController from "./controller";
import { Router } from 'express';

const router = Router();

router.post('/save', validations.userCords, SuperAdminController.save)


export default router 