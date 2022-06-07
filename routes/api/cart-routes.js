const router = require('express').Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../../utils/verifyToken');
const Cart = require('../../models/Cart');


// CREATE NEW CART -> /API/CART
router.post('/', verifyToken, async (req, res) => {
    try {
        const newCart = new Cart(req.body)
        const savedCart = await newCart.save()
        res.status(201).json(savedCart);    
    } catch (err) {
        return res.status(500).json(err);
    }
})

// EDIT CART -> /API/CART/:userId
router.put('/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findOneAndUpdate({userId: req.params.userId}, {
            $set: req.body
        }, {new: true})

        res.status(200).json(updatedCart);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);  
    }
})

// // DELETE CART -> /API/CART/:userId
router.delete('/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findOneAndDelete(req.params.userId)
        res.status(200).json({message: "Cart deleted successfully"})
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);  
    }
})

// GET ALL CARTS -> /API/PRODUCT/
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
    } catch (err) {
        console.log(err);       
        return res.status(500).json(err);
    }
})


// GET CART BY USER ID -> /API/CART/:userId
router.get('/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.userId}) 
        res.status(200).json(cart)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})


module.exports = router;