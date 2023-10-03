"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const staffsList = (0, express_1.Router)();
const mongoUrl = 'mongodb://0.0.0.0:27017';
const dbName = 'Hackathon';
staffsList.post('/', (req, res) => {
    // const { role, name, password } = req.body;
    async function connectTostaffsList() {
        const client = new mongodb_1.MongoClient(mongoUrl);
        try {
            await client.connect();
            const db = client.db(dbName);
            const staffCollection = db.collection('Staff');
            console.log("I am inside staffs list");
            const staffsData = await staffCollection.find({}, { projection: { StaffId: 1, StaffName: 1, _id: 0 } }).toArray();
            res.send(staffsData);
            console.log(staffsData);
        }
        catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
        finally {
            client.close();
        }
    }
    connectTostaffsList();
});
exports.default = staffsList;
