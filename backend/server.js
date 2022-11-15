const app = require("./app")
const cors=require('cors');
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

//Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});



//linking config file to extract variables

dotenv.config({ path: "backend/config/config.env" });

//Connecting to DB
connectDatabase()
app.use(cors());
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})


//Unhandled Promise Rejection - to handled any errrors made to config.env file lets say in URI mongodb is written as mongo
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});