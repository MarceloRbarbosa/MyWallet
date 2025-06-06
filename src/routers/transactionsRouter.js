import { Router } from "express";
import { transactionSchema } from "../schemas/transactionSchema.js"
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { tokenValidate } from "../middlewares/authMiddleware.js";
import { createTransactions, deleteTransaction, getTransactions, modifyTransactions } from "../controllers/transactionController.js";


const transactionRouter = Router ();

transactionRouter.use(tokenValidate);
transactionRouter.post("/transactions", validateSchema(transactionSchema),createTransactions);
transactionRouter.get("/transactions", getTransactions);
transactionRouter.put("/transactions/:id", validateSchema(transactionSchema),modifyTransactions);
transactionRouter.delete("/transactions/:id", deleteTransaction)

export default transactionRouter;


