const router = require('express').Router();
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../../utils/verifyToken');
const Product = require('../../models/Product');


// CREATE NEW PRODUCT -> /API/PRODUCT/
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        savedProduct = await newProduct.save()
        res.status(201).json(savedProduct);    
    } catch (err) {
        if(err.code === 11000) {
            res.status(402).json({message: "A Product With That Title Already Exists"})
            return;
        }
        return res.status(500).json(err);
    }
})

// EDIT PRODUCT -> /API/PRODUCT/:id
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})

        res.status(200).json(updatedProduct);
    } catch (err) {
        if(err.code === 11000) {
            res.status(402).json({message: "A Product With That Title Already Exists"})
            return;
        }
        console.log(err);
        return res.status(500).json(err);  
    }
})

// // DELETE PRODUCT -> /API/PRODUCT/:id
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "product deleted successfully"})
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);  
    }
})

// GET ALL PRODUCTS -> /API/PRODUCT/
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products)
    } catch (err) {
        console.log(err);       
        return res.status(500).json(err);
    }
})


// GET SPECIFIC PRODUCT -> /API/PRODUCT/:id
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id) 
        res.status(200).json(product)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})


module.exports = router;