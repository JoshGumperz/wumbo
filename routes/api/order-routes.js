const router = require('express').Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../../utils/verifyToken');
const Order = require('../../models/Order');


// CREATE NEW ORDER -> /API/ORDER
router.post('/', verifyToken, async (req, res) => {
    try {
        const newOrder = new Order(req.body)
        const savedOrder = await newOrder.save()
        res.status(201).json(savedOrder);    
    } catch (err) {
        return res.status(500).json(err);
    }
})

// EDIT ORDER -> /API/ORDER/:id
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})

        res.status(200).json(updatedOrder);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);  
    }
})

// // DELETE order -> /API/order/:id
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Order deleted successfully"})
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);  
    }
})

// GET ALL ORDERS -> /API/PRODUCT/
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    } catch (err) {
        console.log(err);       
        return res.status(500).json(err);
    }
})


// GET ORDER BY USER ID -> /API/order/:id
router.get('/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }) 
        res.status(200).json(orders)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})


module.exports = router;