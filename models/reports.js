const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

const reportSchema = new mongoose.Schema({
    username: Number,
    name: String,
    doctorName: String,
    status: String,
    date: Date
});

reportSchema.plugin(passportLocalMongoose);
// doctorSchema.plugin(findOrCreate);

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;