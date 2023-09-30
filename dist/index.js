"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
// import routes from "./routes/events";
const login_1 = __importDefault(require("./routes/login"));
const app = (0, express_1.default)();
const port = 5000;
// app.use("/api/v1/doctors", doctorRoutes); // for express
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
const mongoUrl = 'mongodb://0.0.0.0:27017';
const dbName = 'Hackathon';
// const client = new MongoClient(mongoUrl);
// await client.connect();
// const db: Db = client.db(dbName);
// const teamCollection = db.collection('team');
// const eventCollection = db.collection('event');
// // app.use('/hacktrack/events', routes);
// app.use('/hacktrack/login', login);
// app.listen(port, () => {
// console.log(`server listening to port ${port}`);
// });
async function connectToMongoDB() {
    const client = new mongodb_1.MongoClient(mongoUrl);
    try {
        await client.connect();
        const db = client.db(dbName);
        const teamCollection = db.collection('team');
        const eventCollection = db.collection('event');
        //   //Now you can start your Express server here or define your routes.
        //   app.get('/hacktrack/', (req: Request, res: Response) => {
        //     // console.log(req.query);
        //     res.send("My first API route");
        //   });
        // Add the login route
        app.use('/hacktrack/login', login_1.default);
        app.listen(port, () => {
            console.log(`Server listening to port ${port}`);
        });
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
connectToMongoDB();
