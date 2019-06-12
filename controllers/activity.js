const Activity = require('../models').Activity;
const User = require('../models').User;
const Friend = require('../models').Friend;
const Friendship = require('../models').Friendship;
var Sequelize = require('sequelize');
const sequelize = new Sequelize('test', 'root', 'asda1234', {
    host: 'localhost',
    dialect: 'mysql'
  });

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
process.env.SECRET_KEY = 'secret'
  

module.exports = {

    create(req,res) {
        return Activity
        .create({
            name:req.body.name,
            user_name:req.body.user_name,
            user_id:req.body.user_id,
            activity_Balance: 0
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error))
    },

    addactivity: (req,res) =>  {
        console.log(req.body)
        const newActivity = {
            name: req.body.name,
            user_id :req.body.user_id,
            activity_Balance: 0

        }
            Activity.create(newActivity)
                .then(activity=>res.json(activity))
                .catch(err => {
                    res.send(err)
                })
    },
    

    activities: (req, res) => {
        Activity.findAll({
        }).then(listOfActivities=>{
            res.json({listOfActivities})
        })
    },

    changeactivity:(req, res) => {
        let parsedArray = req.body.group
        .split(',').map(function(i){
            return parseInt(i);
        })
        console.log(parsedArray)
        let x = parsedArray.length 
        for (let step = 0; step < x; step++) {
            let selected_id = parseInt(parsedArray[step])
            if(selected_id != req.body.payer_id){
                console.log(selected_id)
                let selected_balance = null
                Activity.findOne({
                    where: { id : selected_id }
                }).then(activity => {
                    selected_balance = (parseInt(activity.activity_Balance) + parseInt(req.body.newBalance))
                    console.log(selected_balance, activity.activity_Balance, req)
                    Activity.update({activity_Balance: selected_balance}, {where: {id: selected_id}})})
                }else{
                    Activity.findOne({
                        where: { id : selected_id }
                    }).then(activity => {
                        selected_balance = (parseInt(activity.activity_Balance) + parseInt(req.body.payerBalance))
                        Activity.update({activity_Balance: selected_balance}, {where: {id: selected_id}})})
                }
        }
    }
       
}