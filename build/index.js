"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const routes_1 = __importDefault(require("./routes/routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Express configurations
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.set("PORT", 3000);
app.set("BASE_URL", "localhost");
// Routes
app.use("/api/v1", routes_1.default);
// MongoDB Connection url from .env file
const mongoDBUrl = process.env.MONGO_DB_URL;
if (!mongoDBUrl) {
    console.log("Error connecting mongoDB");
    process.exit(1);
}
// connection to mongoDB
mongoose_1.default.connect(mongoDBUrl, {})
    .then(() => {
    console.log("Mongo DB Connected !!!");
})
    .catch((error) => {
    console.log(`Mongo DB connection Error : ${error}`);
});
//start the server
try {
    const port = app.get("PORT");
    server.listen(port, () => {
        console.log(`Server is listening at PORT ${port}`);
    });
}
catch (error) {
    console.log(error);
}
exports.default = server;
