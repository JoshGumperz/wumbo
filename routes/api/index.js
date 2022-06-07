const router = require('express').Router();
const userRoutes = require('./user-routes');
const productRoutes = require('./product-routes');
const cartRoutes = require('./cart-routes');
const reviewRoutes = require('./review-routes');
const orderRoutes = require('./order-routes')

router.use('/user', userRoutes);
router.use('/product', productRoutes);
router.use('/cart', cartRoutes);
router.use('/order', orderRoutes);
router.use('/review', reviewRoutes);
router.get('/', (req, res) => {
    res.send('/api routes')
});


module.exports = router;
