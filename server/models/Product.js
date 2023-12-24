import mongoose, { mongo } from "mongoose";
import { loadType } from "mongoose-currency"

const Schema = mongoose.Schema
loadType(mongoose) //lets us have access to m-currency

const ProductSchema = new Schema(
    {
        price: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100
        },
        expense: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100,
        },
        transactions: [ //keep track of all ids that are used for tracking
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Transaction", //referring to Transaction obj
            }
        ],
    },
    { timestamps: true, toJSON: { getters: true } }
)
const Product = mongoose.model("Product", ProductSchema)

export default Product