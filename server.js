const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const workoutRoutes = require("./workoutRoutes"); 

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(express.static("public"));

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");


const path = require("path");
app.set("views", __dirname); 


app.use("/", workoutRoutes);


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
