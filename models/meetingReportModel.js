import mongoose from 'mongoose';

const meetingReportModel = new mongoose.Schema({
    userid: { type: String, required: true }, 
    context: { type: String, required: true },
    date: {type: String, required: true },
    inputs: { type: String, required: true },
    whoisneeded: { type: String, required: true },
    meetingtitle: { type: String, required: true },
    originalmeetingid: { type: Number, required: true },
    outputs: { type: String, required: true },
});

const MeetingReport = mongoose.model('MeetingReport', meetingReportModel);

export default MeetingReport;
