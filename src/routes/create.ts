import { Router, Request, Response } from "express";
import { MongoClient, Db } from 'mongodb';
const create = Router();


const mongoUrl = 'mongodb://0.0.0.0:27017';
const dbName = 'Hackathon';

let lastTeamId: number
let lastEventId: number

create.post('/', (req: Request, res: Response) => {
    const { hackathonId, Teamname, mentorid, teamMembers } = req.body;

    async function connectToLogin() {
        const client = new MongoClient(mongoUrl);
        try {
            await client.connect();

            const db: Db = client.db(dbName);
            const headCollection = db.collection('Head');
            const staffCollection = db.collection('Staff');
            const studentCollection = db.collection('Student');
            const teamCollection = db.collection('Team');
            const eventsCollection = db.collection('Events');
            const teamMembersCollection = db.collection('TeamMembers')


            const existingTeam = await teamCollection.findOne({ TeamName: Teamname });

    if (existingTeam) {
      // Teamname already exists, check in the event collection
      const event = await eventsCollection.findOne({ HackathonID: hackathonId, TeamID: existingTeam.TeamId });

      if (event) {
        // Duplicate data found
        res.status(400).json({ message: 'Duplicate data found.' });
      } else {
        // Add new team to event collection
        const lastTeam = await teamCollection.find().sort({ TeamId: -1 }).limit(1).next() as unknown as {
          TeamId(TeamId: any): unknown; TeamID: string
        };
        // Extract the TeamID

        lastTeamId = Number(lastTeam.TeamId);

        var TeamId1: number = ++lastTeamId;
        console.log(lastTeam)

        const newTeamDocument = {
          TeamId: lastTeamId,
          TeamName: Teamname
        };

        const result = await teamCollection.insertOne(newTeamDocument);
        const teamId = lastTeamId;
        const lastTeam1 = await eventsCollection.find().sort({ EventID: -1 }).limit(1).next() as unknown as {
          EventID(EventID: any): unknown; EventId: string
        };
        lastEventId = Number(lastTeam1.EventID);
        lastEventId++;
        // Add new team to event collection
        const newEvent = { EventID: lastEventId, HackathonID: hackathonId, MentorId: mentorid, TeamID: teamId };
        await eventsCollection.insertOne(newEvent);

        res.status(200).json({ message: 'Team added successfully to the event.' });
        for (const teamMember of teamMembers) {
          const newTeamMember = {
            EventID: lastEventId,
            StudentId: teamMember

          };
          await teamMembersCollection.insertOne(newTeamMember);
        }
      }
    } else {
      // Teamname doesn't exist, add it to the team collection

      const lastTeam = await teamCollection.find().sort({ TeamId: -1 }).limit(1).next() as unknown as {
        TeamId(TeamId: any): unknown; TeamID: string
      };
      // Extract the TeamID

      lastTeamId = Number(lastTeam.TeamId);

      var TeamId1: number = ++lastTeamId;


      const newTeamDocument = {
        TeamId: lastTeamId,
        TeamName: Teamname
      };

      const result = await teamCollection.insertOne(newTeamDocument);
      const teamId = lastTeamId;
      const lastTeam1 = await eventsCollection.find().sort({ EventID: -1 }).limit(1).next() as unknown as {
        EventID(EventID: any): unknown; EventId: string
      };
      lastEventId = Number(lastTeam1.EventID);
      lastEventId++;
      // Add new team to event collection
      const newEvent = { EventID: lastEventId, HackathonID: hackathonId, MentorId: mentorid, TeamID: teamId };
      await eventsCollection.insertOne(newEvent);

      res.status(200).json({ message: 'Team added successfully to the event.' });
      for (const teamMember of teamMembers) {
        const newTeamMember = {
          EventID: lastEventId,
          StudentId: teamMember

        };
        await studentCollection.updateOne({ StudentID: teamMember }, { $set: { status: 1 } });
        await teamMembersCollection.insertOne(newTeamMember);
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

export default create;