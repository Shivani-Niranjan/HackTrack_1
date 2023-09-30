import { Router, Request, Response } from "express";
import { MongoClient, Db } from 'mongodb';
const hackathonList = Router();

const mongoUrl = 'mongodb://0.0.0.0:27017';
const dbName = 'Hackathon';

hackathonList.post('/', (req: Request, res: Response) => {
    // const { role, name, password } = req.body;

    async function connectTohackathonList() {
        const client = new MongoClient(mongoUrl);
        try {
            await client.connect();

            const db: Db = client.db(dbName);
            const hackathonCollection = db.collection('Hackathon');
            console.log("I am inside hackathon list");
            const hackathonData = await hackathonCollection.find({}, { projection: { HackathonID: 1, HackathonName: 1, _id: 0 } }).toArray();
            res.send(hackathonData);
            console.log(hackathonData);


        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
        finally {
            client.close();
        }
    }

    connectTohackathonList();

});

export default hackathonList;