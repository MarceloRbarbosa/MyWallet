import { Router } from "express";
import { transactionSchema } from "../schemas/transactionSchema.js"
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { tokenValidate } from "../middlewares/authMiddleware.js";
import { createTransactions } from "../controllers/transactionController.js";


const transactionRouter = Router ();

transactionRouter.use(tokenValidate);
transactionRouter.post("/transactions", validateSchema(transactionSchema),createTransactions);

export default transactionRouter;