import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    date: {type: String, required: true },
    starttime: { type: String, required: true },
    endtime: { type: String, required: true },
    meetingtitle: { type: String, required: true },
    whoisneeded: { type: String, required: true },
    meetingtype: { type: String, required: true },
    context: { type: String, required: true },
    inputs: { type: String, required: true },
});

const Meeting = mongoose.model('Meeting', meetingSchema);

export default Meeting;
