'use strict'

const express = require('express');
const router = express.Router();
const { Users } = require('../models/index');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const auth = require('../auth/auth.middleware')
// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup usernmae=john password=foo
router.post('/signup', signup);
router.post('/signin',auth, signin);



async function signup(req, res) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const record = await Users.create(req.body);
        res.status(200).json(record);
    } catch (e) { res.status(403).send(e.message); }
}


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
async function signin(req, res) {
    res.status(200).json(req.user);
};


module.exports = router