import { MongoClient } from "mongodb";
import chalk from "chalk";

import dotenv from "dotenv"
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {
    await mongoClient.connect();
    console.log(chalk.bgGreen(`MongoDB conectado!`));
} catch (err) {
    console.log(chalk.bgRed(`Erro ao conectar ao banco de dados!`), err.message);
}

export const db = mongoClient.db();