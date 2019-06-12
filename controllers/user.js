const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require('../models').User;
const Friend = require('../models').Friend;
const Friendship = require('../models').Friendship;

process.env.SECRET_KEY = 'secret'

module.exports ={
    //REGISTER
    register: (req,res) =>  {
        const userData = {
            name: req.body.name,
            password: req.body.password,
            balance: "0",
            email: req.body.email
        }
        
        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if(!user) {
                const hash = bcrypt.hashSync(userData.password, 10)
                userData.password = hash
                User.create(userData)
                    .then(user => {
                        Friend.create(userData).then(friend=>{
                        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                            expiresIn: 1000000000
                        })
                        res.json({token, user, friend})
                    })
                    .catch(err => {
                        res.send(err)
                    })})
            }else{
                res.json({ error: "User already exists"})
            }
        })
    },

    //LOGIN
    login: (req, res) => {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user=>{
            if (bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 10000000000000
                })
                res.json({ token , user})
            } else {
                res.send('User doesnt exit')
            }
        })
        .catch(err => {
            console.log(err)
        })
    },

    fetchusers: (req, res) => {
        var decoded = jwt.verify(req.headers['authorization'].replace(/^JWT\s/, ''), process.env.SECRET_KEY)
        User.findAll().then(users => res.json(users)).catch(err => res.json(err))
    },

    //CRETE FRIENDSHIP

    addfriend: (req,res) =>  {
        var decoded = jwt.verify(req.headers['authorization'].replace(/^JWT\s/, ''), process.env.SECRET_KEY)
        const userAsk = {
            user_id: decoded.id,
            friend_id: parseInt(req.body.friend_id),
            friend_name: req.body.friend_name
        }
        const friendAsk = {
            user_id: parseInt(req.body.friend_id),
            friend_id: parseInt(req.body.user_id),
        }
        Friendship.create(userAsk)
            .then(friendshipOne=>{
                Friendship.create(friendAsk)
                .then(friendshipTwo=>{
                    res.json({friendshipOne, friendshipTwo})
            })
            .  catch(err => {
                res.send(err)
                console.log(decoded)
            })
        })
    },

    getAllFriends: (req, res) => {
        var decoded = jwt.verify(req.headers['authorization'].replace(/^JWT\s/, ''), process.env.SECRET_KEY)
        Friend.findAll()
        .then(friends=>res.json(friends))
    },

    friendlist: (req, res) => {
        var decoded = jwt.verify(req.headers['authorization'].replace(/^JWT\s/, ''), process.env.SECRET_KEY)
        Friendship.findAll({
            where: {
                user_id: decoded.id
            }
        }).then(friends=>{
            let array = friends
            // .map(friendship => friendship.friend_name)
            res.json(array)
        })
    },

    user: (req, res) => {
        var decoded = jwt.verify(req.headers['authorization'].replace(/^JWT\s/, ''), process.env.SECRET_KEY)
        User.findOne({
            where: {
                id : decoded.id
            }
        })
        .then(profile=>{
            res.json({profile})
        })
    }

}