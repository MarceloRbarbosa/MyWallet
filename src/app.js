import express, {json} from "express";
import chalk from "chalk";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(chalk.bgGreen(`Servidor rodando na porta ${PORT}`))
});