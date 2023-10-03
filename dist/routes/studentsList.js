"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const studentsList = (0, express_1.Router)();
const mongoUrl = 'mongodb://0.0.0.0:27017';
const dbName = 'Hackathon';
studentsList.post('/', (req, res) => {
    // const { role, name, password } = req.body;
    async function connectTostudentsList() {
        const client = new mongodb_1.MongoClient(mongoUrl);
        try {
            await client.connect();
            const db = client.db(dbName);
            const studentCollection = db.collection('Student');
            console.log("I am inside students list");
            const studentsData = await studentCollection.find({}, { projection: { StudentID: 1, StudentName: 1, _id: 0 } }).toArray();
            res.send(studentsData);
            console.log(studentsData);
        }
        catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
        finally {
            client.close();
        }
    }
    connectTostudentsList();
});
exports.default = studentsList;
