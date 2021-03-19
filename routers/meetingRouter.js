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
        starteruserid: req.body.starteruserid,
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
    res.status(201).send({message: 'New Order Created', meeting: newmeeting });
}))

// Display meetings started by a specific user
meetingRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    
}))

// Delete a specific meeting
meetingRouter.delete('/:id', expressAsyncHandler(async( req, res) => {

}))

export default meetingRouter;