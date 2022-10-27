import { Router } from "express";
import { clientController } from "../controllers/client.controller";
const router = Router();

router.post("/", clientController.createNewUser);//crear nuevo cliente
router.get("/:userName", clientController.getUserMinutes);// obtener informacion tiempo disponible
router.put("/", clientController.addMinutesToUser);//recargar saldo al cliente

export default router;
