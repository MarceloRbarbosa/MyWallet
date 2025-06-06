import { db } from "../config/database.js";
import bcrypt from "bcrypt";
import chalk from "chalk";
import jwt from "jsonwebtoken";


export async function signUp(req, res) {
    const user = req.body;

    try {
        const existingUser = await db.collection("users").findOne({ email: user.email});
        if(existingUser) return res.status(409).send("Este email já está em uso!") 

        await db.collection("users").insertOne({
            name: user.name,
            email: user.email, 
            password: bcrypt.hashSync(user.password, 10),
        })
        res.status(201).send("Usuário cadastrado com sucesso!")
    } catch (err) {
        return res.status(500).send(err.message)
    }
}

export async function signIn(req, res){
    const user = req.body;

    try {
        const registeredUser = await db.collection("users").findOne({
            email: user.email,
        });

        if(!registeredUser){
            return res.status(404).send("Email não cadastrado!")
        }

        if(registeredUser && bcrypt.compareSync(user.password, registeredUser.password)){
            console.log(chalk.green("Usuário logado!"))
            console.log(chalk.bgWhite(JSON.stringify(registeredUser)))
            
            const token = jwt.sign(
                {userId: registeredUser._id},
                process.env.JWT_SECRET,
                {expiresIn: 86400            
                });
                
            return res.send(token)
        }
        return res.status(401).send("Email ou senha incompativeis!")

    } catch (err) {
        return res.status(500).send(err.message)
    }
}