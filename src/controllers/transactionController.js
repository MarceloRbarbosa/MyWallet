import { db } from "../config/database.js"

export async function createTransactions(req, res) {
    const transaction = req.body;
    

    try {
       await db.collection("transactions").insertOne({ 
            ...transaction,
            // user: res.locals.user._id (retirar caso queira guardar usuario da requisição);
        })
        res.status(201).send("Transação concluida com sucesso!")
    } catch (err) {
        res.status(500).send(err.message);
    } 
};

export async function getTransactions(req, res){

    try {
        const transactions = await db.collection("transactions").find().toArray();

        res.send(transactions);
    } catch (err) {
         res.status(500).send(err.message);
    }
}