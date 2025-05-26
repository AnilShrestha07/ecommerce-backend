const TransactionModel = require("./transaction.model")

class TransactionService{
    storeTransaction = async(data) => {
        try {
            const trans = new TransactionModel(data);
            return  await trans.save()
        } catch (exception) {
            throw exception
        }
    }
}
const transactionSvc = new TransactionService()
module.exports = transactionSvc