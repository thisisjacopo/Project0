const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema ({
    title: String,
    location: String,
    date: Date,
    time: Date,
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;

