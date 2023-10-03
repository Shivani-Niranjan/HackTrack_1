"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const login = (0, express_1.Router)();
const mongoUrl = 'mongodb://0.0.0.0:27017';
const dbName = 'Hackathon';
login.post('/', (req, res) => {
    const { role, name, password, email } = req.body;
    async function connectToLogin() {
        const client = new mongodb_1.MongoClient(mongoUrl);
        try {
            await client.connect();
            const db = client.db(dbName);
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
        }
        catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
        finally {
            client.close();
        }
    }
    connectToLogin();
});
exports.default = login;
