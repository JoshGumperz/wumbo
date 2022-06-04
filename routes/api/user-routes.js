const router = require('express').Router();
const User = require("../../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")


// CREATE NEW USER -> /API/USER/REGISTER 
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_PHRASE).toString()
    })

    try {
        savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

// LOGIN -> /API/USER/LOGIN
router.post('/login', async (req, res) => {
    try {
        const conditions = !req.body.username ? { email: req.body.email } : { username: req.body.username };
        const user = await User.findOne(conditions);
        if(!user) {
            res.status(400).json({ message: 'Invalid Login Credentials' });
            return;
        } 
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password, 
            process.env.PASS_PHRASE
        );
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(originalPassword !== req.body.password) {
            res.status(400).json({ message: 'Invalid Login Credentials' });
            return;
        } 

        const {password, ...others} = user._doc

        const accessToken = jwt.sign({
            id: user._id,
            admin: user.isAdmin
        }, 
        process.env.JWT_SEC,
        {expiresIn:"1d"}
        )

        res.status(200).json({...others, accessToken});    
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;