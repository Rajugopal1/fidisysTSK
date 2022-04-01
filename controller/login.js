const { check, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
// var redis = require('redis');
// var JWTR =  require('jwt-redis').default;
// var redisClient = redis.createClient();
// var jwtr = new JWTR(redisClient);
const User = require("../model/userModel");

module.exports = {
    async userLogin(req, res) {
        await check('email')
            .notEmpty()
            .isEmail()
            .withMessage('email is not provide')
            .run(req);
        await check('password')
            .notEmpty()
            .withMessage('password is not provide')
            .run(req)


        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).send(errors);
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) return res.status(401).send('Invalid email or password')
        const isAuthUser = await User.passwordCompare(password, user.password)
        if (!isAuthUser) return res.status(401).send('Invalid email or password')
        const token = await user.generateAuthToken()
        res.send({ user: user , token:  token})
    },
    // async userLogout(req, res) {
    //     let sess = req.user;
        
    //         try {
    //             let token =  req.header("Authorization");
    //             sess = null;
    //          await new Promise( jwtr.destroy(token))
    //         return res.send({'success': true, "message": "user logout successfully"});
    //         }
    //         catch (error) {
    //             return res.status(400).send({message: error.message})
    //         }
            
    // }
}