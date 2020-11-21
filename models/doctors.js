const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
// const findOrCreate = require('mongoose-findorcreate');

const doctorSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    name: String
});

doctorSchema.plugin(passportLocalMongoose);
// doctorSchema.plugin(findOrCreate);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;