const router = require('express').Router();
const User = require("../../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken");
const { verifyTokenAndAuthorization } = require('../../utils/verifyToken');


// CREATE NEW USER -> /API/USER/REGISTER 
router.post('/register', async (req, res) => {
    try {
        let savedUser
        if(req.body.username && req.body.email && req.body.password) {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_PHRASE).toString()
                })
                savedUser = await newUser.save()
            } else {
            res.status(400).json({ message: "Missing Credentials" });
            return;
            }
        const {password, ...others} = savedUser._doc
        const accessToken = jwt.sign({
            id: savedUser._id,
            admin: savedUser.isAdmin
        }, 
        process.env.JWT_SEC,
        {expiresIn:"1d"}
        )
        res.status(201).json({...others, accessToken});    
    } catch (err) {
        if(err.code === 11000) {
            res.status(402).json({message: "User Already Exists"})
            return;
        }
        console.log(err);
        res.status(500).json(err);
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
        console.log(err);
        res.status(500).json(err);  
    }
})

// EDIT USER -> /API/USER/:id
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_PHRASE).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})

        const {password, ...others} = updatedUser._doc

        res.status(200).json(others);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);  
    }
})

module.exports = router;