import mongoose, { mongo } from "mongoose";
import { loadType } from "mongoose-currency"

const Schema = mongoose.Schema
loadType(mongoose) //lets us have access to m-currency

const TransactionSchema = new Schema(
    { //every product has a buyer and a number of products both, hence they're tracked
        buyer: {
            type: String,
            required: true
        },
        amount: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100,
        },
        productIds: [ 
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product", 
            }
        ],
    },
    { timestamps: true, toJSON: { getters: true } }
)
const Transaction = mongoose.model("Transaction", TransactionSchema)

export default Transaction