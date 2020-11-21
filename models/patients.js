const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
// const findOrCreate = require('mongoose-findorcreate');

const patientsSchema = new mongoose.Schema({
    username: {type: Number, unique: true},
    name: String
    // doctorName: String,
    // status: String,
    // date: Date
});

patientsSchema.plugin(passportLocalMongoose);
// doctorSchema.plugin(findOrCreate);

const Patients = mongoose.model('Patients', patientsSchema);

module.exports = Patients;