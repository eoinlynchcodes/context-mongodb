import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import MeetingReport from '../models/meetingReportModel.js';

const meetingReportRouter = express.Router();

meetingReportRouter.get('/', expressAsyncHandler(async (req, res) => {
    const meetingReports = await MeetingReport.find({});
    res.send(meetingReports);
}));

meetingReportRouter.post('/', expressAsyncHandler(async (req, res) => {
    const meetingReport = new MeetingReport({
        userid: req.body.userid,
        context: req.body.context,
        date: req.body.date,
        inputs: req.body.inputs,
        whoisneeded: req.body.whoisneeded,
        meetingtitle: req.body.meetingtitle,
        originalmeetingid: req.body.originalmeetingid,
        outputs: req.body.outputs,
    })
    const newmeetingreport = await meetingReport.save();
    if(newmeetingreport){
        res.status(201).send({ meetingreport: newmeetingreport });
    } else {
        res.status(404).send({ message: 'Meeting not found.' });
    }
}));

export default meetingReportRouter;
