import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import kpiRoutes from "./routes/kpi.js"; //node js needs to have .js specified
import productsRoutes from "./routes/product.js"
import transactionRoutes from "./routes/transaction.js"; ///
import Product from "./models/Product.js"
import KPI from './models/KPI.js';
import Transaction from "./models/Transaction.js"
import { kpis, products, transactions } from "./data/data.js"

// CONFIGURATIONS
dotenv.config();
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

//ROUTES
app.use("/kpi", kpiRoutes) //entry pt for kpiroutes
app.use("/product", productsRoutes)
app.use("/transaction", transactionRoutes)

//MONGOOSE SETUP, try with ''
const PORT = process.env.PORT || 9000
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
        //b4 we feed db with new info, we drop durrent db to avoid dupes
        //add data 1 time only, or as needed
        // await mongoose.connection.db.dropDatabase()
        // KPI.insertMany(kpis)
        // Product.insertMany(products) //insert products into Product db
        // Transaction.insertMany(transactions) 
    })
    .catch((error) => console.log(`${error} did not connect to DB`))

