import express, {Express} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import router from "./routes/routes";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app:Express = express();
const server = http.createServer(app);

// Express configurations
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("PORT", 3000);
app.set("BASE_URL", "localhost");

// Routes
app.use("/api/v1", router);

// MongoDB Connection url from .env file
const mongoDBUrl = process.env.MONGO_DB_URL;
if(!mongoDBUrl) {
    console.log("Error connecting mongoDB");
    process.exit(1);
}
// connection to mongoDB
mongoose.connect(mongoDBUrl, {})
.then(():void => {
    console.log("Mongo DB Connected !!!");
})
.catch((error):void => {
    console.log(`Mongo DB connection Error : ${error}`);
});


//start the server
try {
    const port = app.get("PORT");
    server.listen(port, ():void => {
        console.log(`Server is listening at PORT ${port}`);
    })
} catch (error) {
    console.log(error);
}

export default server;