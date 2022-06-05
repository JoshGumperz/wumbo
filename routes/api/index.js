const router = require('express').Router();
const userRoutes = require('./user-routes');
const productRoutes = require('./product-routes')

router.use('/user', userRoutes);
router.use('/product', productRoutes);
router.get('/', (req, res) => {
    res.send('/api routes')
});


module.exports = router;
