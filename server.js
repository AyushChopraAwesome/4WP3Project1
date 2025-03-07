const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const workoutRoutes = require("./routes/workoutRoutes");


const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", "./views");

app.use("/", workoutRoutes);

app.listen(PORT, ()=> {console.log('Server Successfully Running')});