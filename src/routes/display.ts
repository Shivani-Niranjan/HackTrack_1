import {staffDisplayEvents} from "../controllers/staffDisplay";
import { Router } from "express";
const displayRoutes = Router();
displayRoutes.post("/staff", staffDisplayEvents);






export default displayRoutes;





// import { Router, Request, Response } from "express";
// import { MongoClient, Db } from 'mongodb';
// const display = Router();

// const mongoUrl = 'mongodb://0.0.0.0:27017';
// const dbName = 'Hackathon';

// display.post('/', (req: Request, res: Response) => {
//     const { id, role } = req.body;

//     async function connectTodisplay() {
//         const client = new MongoClient(mongoUrl);
//         try {
//             await client.connect();

//             const db: Db = client.db(dbName);
//             const eventsCollection = db.collection('Events');

//             if(role == "mentor"){
//             console.log("I am displaying mentor events list");

//             const cursor = eventsCollection.find({ MentorId: id }).project({ EventID: 1 , _id: 0});
//             const eventIDs = await cursor.toArray();
//             res.send(eventIDs); 

//             }
//         } catch (error) {
//             console.error("Error connecting to MongoDB:", error);
//         }
//         finally {
//             client.close();
//         }
//     }
//     connectTodisplay();

// });

// export default display;