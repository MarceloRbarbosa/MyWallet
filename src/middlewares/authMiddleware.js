import jwt from "jsonwebtoken";
import { db } from "../config/database.js"; 
import { ObjectId } from "mongodb";

import dotenv from "dotenv"
dotenv.config();


export async function tokenValidate(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "").trim();
    if(!token) return res.sendStatus(401);

try {
    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded)=>{
        if(error) return res.sendStatus(401)

    const user = await db.collection("users").findOne({
        _id: new ObjectId(decoded.userId)
    });
    if(!user) return res.sendStatus(401);
    res.locals.user = user;

    next();
    })
} catch (err) {
    return res.Status(500).send(err.message);
}
}