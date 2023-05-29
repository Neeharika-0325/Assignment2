const express =require('express')
const userRouter = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../model/user');

const env = require('dotenv').config();

userRouter.post('/register', (req,res)=>{
    const userDetails = req.body;
    bcrypt.hash(userDetails.password, 10).then(encryptedData=>{
        const newUser = new user({
            name: userDetails.name,
            email: userDetails.email,
            password: encryptedData
        })
        newUser.save().then(record => {
            res.status(200).send({
                // message : 'user registered successfully'
                status : 'success',
                data : record
            })
        }).catch(err=>{
            res.status(400).send({
                error : 'failed to create user' 
            })
        })
    }).catch(err=>{
        res.status(400).send({
            error : 'server error'
        })
    })
    
})

// const key = process.env.ENCRYPTION_SECRET
// console.log(env, key)

userRouter.post('/login', (req, res) => {
    const userDetails = req.body;
    user.findOne({email: userDetails.email}).then(registeredUser => {
        // console.log(registeredUser)
        if(registeredUser) {
            return bcrypt.compare(userDetails.password, registeredUser.password).then(authStatus => {
                if(authStatus) {
                    // console.log(authStatus);
                    return jwt.sign(
                        {
                            email: registeredUser.email, 
                            id: registeredUser._id
                        }, 
                        process.env.ENCRYPTION_SECRET,
                        {
                        expiresIn: "1h"
                        }, (err, token) => {
                            if(err) {
                                return res.status(500).send({
                                    message: "Token creation failed"
                                });
                            }
                            return res.status(200).send({
                                status: "Authentication successful",
                                token: token
                            });
                        }
                    )
                }
                // if authStatus is false
                res.status(400).send({
                    message: "Authentication failed"
                });

            })
        }
        res.status(400).send({
            message: "Authentication failed"
        });
    }).catch(err => {
        res.send(err);
    })

})


module.exports = userRouter;