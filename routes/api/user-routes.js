const router = require('express').Router();
const User = require("../../models/User")
const CryptoJS = require("crypto-js")

router.get('/', (req, res) => {
    res.send('/user routes')
})

router.get('/register', (req, res) => {
    res.send('/user/register routes')
})

//REGISTER 
router.post('/register', async (req, res) => {
    console.log(req.body)
    res.status(200).json(req.body)
    // const newUser = new User({
    //     username: req.body.username,
    //     email: req.body.username,
    //     password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_PHRASE).toString()
    // })

    // try {
    //     savedUser = newUser.save()
    //     res.status(201).json(savedUser)
    // } catch (err) {
    //     res.status(500).json(err)
    // }
})

module.exports = router;