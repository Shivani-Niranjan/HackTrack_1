import express, {Application, Request, Response} from "express";
import bodyParser from 'body-parser';
import { MongoClient, Db } from 'mongodb';

// import routes from "./routes/events";
import login from "./routes/login";
import create from "./routes/create";
import studentsList from "./routes/studentsList";
import staffsList from "./routes/staffsList";
import hackathonList from "./routes/hackathonList";
import mentor from "./routes/mentor";
// import display from "./routes/display";
import displayRoutes from "./routes/display";

const app: Application = express();
const port: number = 5001;


// app.use("/api/v1/doctors", doctorRoutes); // for express

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use('/hacktrack/login', login);
app.use('/hacktrack/create', create)
app.use('/hacktrack/studentsList', studentsList);
app.use('/hacktrack/staffsList', staffsList);
app.use('/hacktrack/hackathonList', hackathonList);
app.use('/hacktrack/mentor', mentor);

app.use('/hacktrack/display', displayRoutes)

app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
  });


  