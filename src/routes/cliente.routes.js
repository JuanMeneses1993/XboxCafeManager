import { Router } from "express";
import { methods as clienteController } from "./../controllers/cliente.controller";

const router = Router();

router.get("/", clienteController.getClientes);
router.get("/:id", clienteController.getCliente);
router.post("/", clienteController.addCliente);
router.put("/:id", clienteController.updateCliente);
router.delete("/:id", clienteController.deleteCliente);

export default router;
