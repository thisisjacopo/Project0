const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema ({
    title: String,
    location: String,
    date: String,
    time: String,
    host: String,
});

eventSchema.set('timestamps', true);

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;

