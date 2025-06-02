import { Router } from "express"
import { signUp, signIn } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { authSchema, authLoginSchema } from "../schemas/authSchema.js";


const authRouter = Router();

authRouter.post("/sign-up",validateSchema(authSchema),signUp)
authRouter.post("/sign-in",validateSchema(authLoginSchema),signIn )


export default authRouter;