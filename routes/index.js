const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.get('/', (req, res) => {
    res.status(200).json({ message: '/ routes' })
    return
})

module.exports = router;
