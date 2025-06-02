import "./config/database.js";
import express, { json } from "express";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routers/authRouter.js";
dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(authRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(chalk.blue(`Servidor está rodando na porta`) + chalk.magenta(` ${port}`))
});