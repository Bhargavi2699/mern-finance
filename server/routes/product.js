import express from "express";
import Product from "../models/Product.js";

const router = express.Router();
router.get("/products", async (req, res) => {
    try {
        const products = await Product.find()
        //get infor from db using mongoose - ODM
        res.status(200).json(products); //all products will be sent back to frontend
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

export default router
