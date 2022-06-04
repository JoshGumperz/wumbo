const router = require('express').Router();
const userRoutes = require('./user-routes');

router.use('/user', userRoutes);
router.get('/', (req, res) => {
    res.send('/api routes')
})


module.exports = router;
