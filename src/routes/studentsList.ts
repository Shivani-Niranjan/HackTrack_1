import { Router, Request, Response } from "express";
import { MongoClient, Db } from 'mongodb';
const studentsList = Router();

const mongoUrl = 'mongodb://0.0.0.0:27017';
const dbName = 'Hackathon';

studentsList.post('/', (req: Request, res: Response) => {
    // const { role, name, password } = req.body;

    async function connectTostudentsList() {
        const client = new MongoClient(mongoUrl);
        try {
            await client.connect();

            const db: Db = client.db(dbName);
            const studentCollection = db.collection('Student');
            console.log("I am inside students list");
            const studentsData = await studentCollection.find({}, { projection: { StudentID: 1, StudentName: 1, _id: 0 } }).toArray();
            res.send(studentsData);
            console.log(studentsData);


        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
        finally {
            client.close();
        }
    }

    connectTostudentsList();

});

export default studentsList;