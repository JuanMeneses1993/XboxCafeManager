import { Router } from "express";
import { methods as staticController } from "./../controllers/static.controller";

const router = Router();

router.get("/adminJuanito", staticController.sendAdminJuanito);


export default router;
