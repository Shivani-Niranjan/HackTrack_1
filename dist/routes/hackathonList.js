"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const hackathonList = (0, express_1.Router)();
const mongoUrl = 'mongodb://0.0.0.0:27017';
const dbName = 'Hackathon';
hackathonList.post('/', (req, res) => {
    // const { role, name, password } = req.body;
    async function connectTohackathonList() {
        const client = new mongodb_1.MongoClient(mongoUrl);
        try {
            await client.connect();
            const db = client.db(dbName);
            const hackathonCollection = db.collection('Hackathon');
            console.log("I am inside hackathon list");
            const hackathonData = await hackathonCollection.find({}, { projection: { HackathonID: 1, HackathonName: 1, _id: 0 } }).toArray();
            res.send(hackathonData);
            console.log(hackathonData);
        }
        catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
        finally {
            client.close();
        }
    }
    connectTohackathonList();
});
exports.default = hackathonList;
