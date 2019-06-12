const Event = require('../models').Event;
const Activity = require('../models').Activity;
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
process.env.SECRET_KEY = 'secret'

module.exports = {
    create(req,res) {
        return Event
        .create({
            name:req.body.name,
            user_id:req.body.user_id,
            activity_id:req.body.activity_id,
            isActive: true
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error))
    },

    // createEvent: (req,res) =>  {
    //     var decoded = jwt.verify(req.headers['authorization'].replace(/^JWT\s/, ''), process.env.SECRET_KEY)
    //     console.log(req.body.friends)
    //     let array = [req.body.friends]
    //     let eventProps = {
    //         user_id: decoded.id,
    //         name:req.body.name,
    //         isActive: true,
    //         activity_id: parseInt(req.body.activity_id),
    //     }
    //     Event.create(eventProps)
    //     .then(event=>{
    //         res.json(event)
    //     }).catch(err => {
    //         console.log(err)
    //         res.send(err)
    //     }) 
    // },

    allEvents: (req, res) => {
        var decoded = jwt.verify(req.headers['authorization'].replace(/^JWT\s/, ''), process.env.SECRET_KEY)
        Event.findAll({
            where: {
                user_id: decoded.id,
                isActive: true
            }
        })
        .then(events=>{
            res.json( events )})
        .catch(err=> res(err))
    },

    filteredEvents: (req,res) => {
        var decoded = jwt.verify(req.headers['authorization'].replace(/^JWT\s/, ''), process.env.SECRET_KEY)
        Event.findAll({
            where: {
                name: req.body.name,
                id: req.body.id,
                active: true
            }
        }).then(events =>{
            res.json(events)
        }).catch(err=>res.json(err))
    },

    createEvent: (req,res) =>  {
        var decoded = jwt.verify(req.headers['authorization'].replace(/^JWT\s/, ''), process.env.SECRET_KEY)
        console.log(req.body)
        let array = []
        let parsedArray = req.body.group
        .split(',').map(function(i){
            return parseInt(i);
        })
        console.log(parsedArray)
        let x = parsedArray.length 
        for (let step = 0; step < x; step++) {
            let selected_id = parseInt(parsedArray[step])
            console.log(selected_id)
            let newActivity = {
                name: req.body.activity_name,
                user_id: selected_id,
                activity_Balance: 0
            }
            Activity.create(newActivity)
                .then(activity=>{
                    let newEvent = {
                        name: req.body.event_name,
                        user_id: selected_id,
                        activity_id: activity.id,
                        isActive: true
                    }
                    Event.create(newEvent)
                    .then(created_event=>{
                        console.log(created_event.dataValues)
                    }).then(resp=>res.json(resp))
                })}
    }


}