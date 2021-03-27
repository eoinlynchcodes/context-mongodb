import express from 'express';
import expressAsyncHandler from "express-async-handler";
import Meeting from '../models/meetingModel.js';


const meetingRouter = express.Router();

meetingRouter.get("/", expressAsyncHandler(async (req, res) => {
        const meetings = await Meeting.find({});
        res.send(meetings);
    })
);

meetingRouter.post("/", expressAsyncHandler(async( req, res) => {
    const meeting = new Meeting({
        userid: req.body.userid,
        date: req.body.date,
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        meetingtitle: req.body.meetingtitle,
        whoisneeded: req.body.whoisneeded,
        meetingtype: req.body.meetingtype,
        context: req.body.context,
        inputs: req.body.inputs,
    });
    const newmeeting = await meeting.save();
    res.status(201).send({message: 'Meeting Scheduled', meeting: newmeeting });
}))

// Display meetings started by a specific user
// There should be multiple. This should return an array. 
meetingRouter.get('/:id', expressAsyncHandler(async( req, res) => {
    const useridtopass = req.params.id;
    const usersmeetings = await Meeting.find({ userid: useridtopass});
    if(usersmeetings){
        res.status(200).send(usersmeetings);
    } else {
        res.status(404).send({ message: "Meeting not in database." });
    }
}));

// Delete a specific meeting
meetingRouter.delete('/:id', expressAsyncHandler(async (req, res) => {
    const meetingtodelete = await Meeting.findById(req.params.id);
    if(meetingtodelete){
        const deletedmeeting = await meetingtodelete.remove();
        res.send({ message: 'Meeting Deleted', meetingtodelete: deletedmeeting });
    } else {
        res.status(404).send({ message: 'Meeting not found.' });
    }
}));

export default meetingRouter;