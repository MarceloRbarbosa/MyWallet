import { db } from "../config/database.js"

export async function createTransactions(req, res) {
    const transaction = req.body;
    const user = res.locals.user; 

    try {
        await db.collection("transactions").insertOne({
            userId: user._id,
            value: transaction.value,
            description: transaction.description,
            type: transaction.type,
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