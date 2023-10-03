"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const mentor = (0, express_1.Router)();
const mongoUrl = 'mongodb://0.0.0.0:27017';
const dbName = 'Hackathon';
mentor.post('/', (req, res) => {
    // const { hackathonId, teamname, teamleader, teamMembers, mentorid, staffs } = req.body;
    const { status, mentorid, eventid } = req.body;
    console.log(status, mentorid, eventid);
    console.log(typeof status);
    async function connectTomentor() {
        const client = new mongodb_1.MongoClient(mongoUrl);
        try {
            await client.connect();
            const db = client.db(dbName);
            const headCollection = db.collection('Head');
            const staffCollection = db.collection('Staff');
            const studentCollection = db.collection('Student');
            const teamCollection = db.collection('Team');
            const eventsCollection = db.collection('Events');
            const teamMembersCollection = db.collection('TeamMembers');
            console.log("I am mentor");
            if (status === -1) {
                console.log("i am inside negative");
                await eventsCollection.updateOne({ EventID: eventid }, { $set: { MentorId: -1 } });
                res.send({ "status": status });
                console.log("update done");
            }
            else if (status === 1) {
                const result = await eventsCollection.updateOne({ EventID: parseInt(eventid) }, { $set: { MentorId: mentorid } });
                res.send({ "status": status });
            }
        }
        catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
        finally {
            client.close();
        }
    }
    connectTomentor();
});
exports.default = mentor;
