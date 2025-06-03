import { ObjectId } from "mongodb";
import { db } from "../config/database.js"

export async function createTransactions(req, res) {
    const transaction = req.body;
    const user = res.locals.user

    try {
       await db.collection("transactions").insertOne({ 
            ...transaction,
            userId: new ObjectId(user._id),
            date: new Date()
        })
        res.status(201).send("Transação concluida com sucesso!")
    } catch (err) {
        res.status(500).send(err.message);
    } 
};

export async function getTransactions(req, res){
    const user = res.locals.user
    
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page-1) * limit;


        const transactions = await db.collection("transactions").find({userId: new ObjectId(user._id)}).sort({ date: -1 }).skip(skip).limit(limit).toArray();

        res.send(transactions);
    } catch (err) {
         res.status(500).send(err.message);
    }
}

export async function modifyTransactions(req, res){
    const transaction = req.body;
    const { id } = req.params;
    const user = res.locals.user;
    
    try {
        const oldTransaction = await db.collection("transactions").findOne({
            _id: new ObjectId(id)
        });
        if(!oldTransaction){
            return res.status(404).send("Essa transação não existe!");
        }

        if(oldTransaction.userId.toString() !== user._id.toString()){
            return res.status(401).send("Você não tem autorização para editar essa transação!");
        }

        const result = await db.collection("transactions").updateOne({
            _id: new ObjectId(id)
        },{
            $set: {
                value: transaction.value,
                description: transaction.description,
                type: transaction.type
            }
        });
        
        if(result.matchedCount === 0){
            return res.status(404).send("Essa transação não existe!")
        }
        res.sendStatus(204)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function deleteTransaction(req, res){
    const { id } = req.params;
     const user = res.locals.user;

    try {
        const existingTransaction = await db.collection("transactions").findOne({
            _id: new ObjectId(id)
        });

        if(!existingTransaction){
            return res.status(404).send("Essa transação não existe");
        }
        
        if(existingTransaction.userId.toString() !== user._id.toString()){
            return res.status(401).send("Você não tem autorização para deletar essa transação!");
        }

         await db.collection("transactions").deleteOne({
            _id: new ObjectId(id)
        });

        res.sendStatus(204)
    } catch (err) {
        res.status(500).send(err.message)
    }
}