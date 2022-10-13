import { Router } from "express";
import { tvController } from "./../controllers/tv.controller";

const router = Router();

router.post("/", tvController.activateTv);
router.get("/", tvController.tvInfo);
router.get("/deactivate/:id", tvController.deactivateTv);

export default router;
