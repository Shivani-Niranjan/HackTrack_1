import { Router, Request, Response } from "express";
import { MongoClient, Db } from 'mongodb';
const staffsList = Router();

const mongoUrl = 'mongodb://0.0.0.0:27017';
const dbName = 'Hackathon';

staffsList.post('/', (req: Request, res: Response) => {
    // const { role, name, password } = req.body;

    async function connectTostaffsList() {
        const client = new MongoClient(mongoUrl);
        try {
            await client.connect();

            const db: Db = client.db(dbName);
            const staffCollection = db.collection('Staff');
            console.log("I am inside staffs list");
            const staffsData = await staffCollection.find({}, { projection: { StaffId: 1, StaffName: 1, _id: 0 } }).toArray();
            res.send(staffsData);
            console.log(staffsData);


        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
        finally {
            client.close();
        }
    }

    connectTostaffsList();

});

export default staffsList;