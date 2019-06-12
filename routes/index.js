const userController = require('../controllers/user')
const eventController = require('../controllers/event')
const activityController = require('../controllers/activity')

module.exports= (app) => {
    app.get('/users', (req, res) => res.status(200).send({
        message: "OK we are in users"
    }));

    //USER END POINTS
    app.post('/register', userController.register);
    app.get("/userslist", userController.fetchusers)
    app.post("/user", userController.user)
    app.post('/login', userController.login)
    app.post("/friendlist", userController.friendlist)
    app.post("/add_friend", userController.addfriend)
    app.get("/suggestions", userController.getAllFriends)


    //EVENT END POINTS
    app.post("/create", eventController.createEvent)
    app.post("/create_event",eventController.createEvent)
    app.post("/all_events", eventController.allEvents)
    app.post("/filtered_events", eventController.filteredEvents)

    // ACTIVITY END POINTS
    app.post("/add_activity", activityController.addactivity)
    app.put("/update_activity", activityController.changeactivity)
    app.get("/activities", activityController.activities)
}