const router = require('express').Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../../utils/verifyToken');
const Review = require('../../models/Review');


// CREATE NEW REVIEW -> /API/REVIEW
router.post('/', verifyToken, async (req, res) => {
    try {
        const newReview = new Review(req.body)
        const savedReview = await newReview.save()
        res.status(201).json(savedReview);    
    } catch (err) {
        return res.status(500).json(err);
    }
})

// EDIT REVIEW -> /API/REVIEW/:id       
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})

        res.status(200).json(updatedReview);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);  
    }
})

// // DELETE Review -> /API/Review/:id
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Review deleted successfully"})
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);  
    }
})

// GET REVIEWS BY PRODUCT ID -> /API/REVIEW/:userid
router.get('/:productId', async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId }) 
        res.status(200).json(reviews)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})

// GET ALL REVIEWS -> /API/PRODUCT/
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews)
    } catch (err) {
        console.log(err);       
        return res.status(500).json(err);
    }
})


// GET REVIEWS BY USER ID -> /API/REVIEW/:userid
router.get('/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const reviews = await Review.find({ userId: req.params.userId }) 
        res.status(200).json(reviews)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})


module.exports = router;