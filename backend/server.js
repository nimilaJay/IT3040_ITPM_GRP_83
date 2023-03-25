require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const connectDB = require("./config/db.js");
const cors = require("cors");

const employees = require("./routes/employees");
const clients = require("./routes/clients");



// Connecting Routes
app.use(employees);


//import routes


//add routes here ..
app.use(employees);
app.use(clients);

// Error Handler Middleware ..


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
  });
