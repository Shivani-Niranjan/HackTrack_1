import { Router, Request, Response } from "express";
import { MongoClient, Db } from 'mongodb';
const login = Router();

const mongoUrl = 'mongodb://0.0.0.0:27017';
const dbName = 'Hackathon';

login.post('/', (req: Request, res: Response) => {
    const { role, name, password, email } = req.body;

    async function connectToLogin() {
        const client = new MongoClient(mongoUrl);
        try {
            await client.connect();

            const db: Db = client.db(dbName);
            const headCollection = db.collection('Head');
            const staffCollection = db.collection('Staff');
            const studentCollection = db.collection('Student');

            // checking if its STUDENT
            if (role === "student") {
                const student = await studentCollection.findOne({ StudentName: name, Password: password });
                console.log(student);

                if (student) {
                    res.send({ "status": 1, "id": parseInt(student.StudentID), "role": role });
                }
                else {
                    res.send({ "status": -1 });
                }
            }

            // checking if its MENTOR or STAFF
            else if (role === "staff") {
                const staff = await staffCollection.findOne({ StaffName: name, password: password });
                if (staff) {
                    res.send({ "status": 1, "id": parseInt(staff.StaffId), "role": role });
                }
                else {
                    res.send({ "status": -1 });
                }
            }

            // checking if its HEAD
            else if (role === "head") {
                const head = await headCollection.findOne({ HeadName: name, password: password });
                if (head) {
                    res.send({ "status": 1, "id": parseInt(head.HeadId), "role": role });
                }
                else {
                    res.send({ "status": -1 });
                }
            }


        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
        finally {
            client.close();
        }
    }

    connectToLogin();

});

export default login;