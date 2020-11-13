// Dependencies
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

//Sets up express
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(morgan("dev"));

// Setting up express to handle parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Mongo db
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false
})

// Setting up routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//Starting server
app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
});