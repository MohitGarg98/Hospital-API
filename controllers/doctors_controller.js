const Doctor = require('../models/doctors');
const Patients = require('../models/patients');
const Report = require('../models/reports');
const passport = require('../config/passport');

module.exports.register = function(req, res){
    res.render("doctor_register");
}

module.exports.login = function(req, res){
  if(req.isAuthenticated()){
        res.render('doctor_login');
  }else{
    res.render('doctor_login')
  }
}

module.exports.home = function(req, res){
    if(req.isAuthenticated()){
      res.render('home', {doctor: req.user.name});
    }else{
      res.redirect("/doctors/login");
    }
}

module.exports.createreport = function(req, res){
  if(req.isAuthenticated()){
    res.render('create_report');
  }else{
    res.redirect("/doctors/login");
  }
}

module.exports.status = function(req, res){
  const status = req.params.status;
  Report.find({status: { '$regex':status}}, function(err, report){
    if(err){console.log('20', err, '20');}
    else{
      console.log('22',report,'22');
      res.render("status", {report: report});
    }
  })
}

module.exports.registerPost = function(req, res){
  Doctor.findOne({ username: req.body.username }, function(err, user) {
    if (user) {
        req.flash(
                  'failure_msg',
                  'User Id Already Exists'
        );
        res.redirect('back');
      }else
      {
        Doctor.register({username: req.body.username, name: req.body.name}, req.body.password, function(err, user) {
          if (err) {console.log(err);}
          else{
              passport.authenticate("local")(req, res, function(){
                req.flash(
                  'success_msg',
                  'Registered Successfully'
                );
                res.redirect("/doctors/home");
              });
          }       
        });
      }
  });
}

module.exports.loginPost = passport.authenticate('local', {
    successRedirect: '/doctors/home',
    failureRedirect: 'back',
    failureFlash: {type: 'failure_msg', message: 'Invalid ID or password.'}
});