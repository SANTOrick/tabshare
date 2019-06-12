const express = require("express");
var createError = require("http-errors");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const http = require("http");

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


// let Users = require('./routes/index')
// app.use('/userslist', Users)




var models = require("./models");

models.sequelize
  .sync()
  .then(function() {
    console.log("Allgood");
  })
  .catch(function(err) {
    console.log(err);
  });

require("./routes")(app);
// app.get("*", (req, res) =>
//   res.status(200).send({
//     message: "Welcome to the beginning of nothingness."
//   })
// );

const port = parseInt(process.env.PORT, 10) || 8000;
app.set("port", port);
// const server = http.createServer(app);
// server.listen(port);
app.listen(port, () => console.log("app running"))
module.exports = app;
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'asda1234';
