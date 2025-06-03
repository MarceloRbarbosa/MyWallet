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
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page-1) * limit;


        const transactions = await db.collection("transactions").find().skip(skip).limit(limit).toArray();

        res.send(transactions);
    } catch (err) {
         res.status(500).send(err.message);
    }
}