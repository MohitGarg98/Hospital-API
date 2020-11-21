const Patients = require('../models/patients');
const Reports = require('../models/reports');
const passport = require('../config/passport');

module.exports.register = function(req, res){
  if(req.isAuthenticated()){
      res.render('patients_register');
    }else{
      res.redirect("/doctors/login");
    }    
}

module.exports.createReport = function(req, res){
  if(req.isAuthenticated()){
    res.render('create_report', {id: req.params.id});
  }else{
    res.redirect("/doctors/login");
  }  
}

module.exports.getPatient = function(req, res){
  if(req.isAuthenticated()){
    res.render('get_patients');
  }else{
    res.redirect("/doctors/login");
  }  
}

module.exports.getReports = function(req, res){
  if(req.isAuthenticated()){
    res.render('get_reports');
  }else{
    res.redirect("/doctors/login");
  }   
}

module.exports.allReports = function(req, res){  
    if(req.isAuthenticated()){
      console.log('38',req.user,'39');
      const doctName = req.user.name;
      Reports.find({username: req.params.id}, function(err, patient){
        if(err){console.log(err); return;}
        else{
          if(patient.length != 0){
            console.log(patient);
            res.render('all_reports', {patient: patient, doctName: doctName});
          }else{
            res.render('no_records');
          }
        }
      })
    }else{
      res.redirect('/doctors/login');
    }
}

module.exports.getStatus = function(req, res){  
    if(req.isAuthenticated()){
          res.render('get_status');
      }
    else{
      res.redirect('/doctors/login');
    }
}

module.exports.logout = function(req, res){  
    req.logout();
    res.redirect('/doctors/login')
}

module.exports.getPatientPost = function(req, res){
  Patients.findOne({username: req.body.username}, function(err, patient){
    if(err){
      console.log('15', err, '15');
      return;
    }else{
      if(patient){
        console.log(patient);
        console.log(patient.id);
        res.redirect("/patients/" + patient.username + "/createreport");
      }else{
        req.flash(
                  'failure_msg',
                  'Wrong Mobile Number'
                );
        res.redirect("back");
      }
    }
  })
}

module.exports.getReportsPost = function(req, res){
  Patients.findOne({username: req.body.username}, function(err, patient){
    if(err){
      console.log('15', err, '15');
      return;
    }else{
      if(patient){
        res.redirect("/patients/" + patient.username + "/allreports");
      }else{
        req.flash(
                  'failure_msg',
                  'Wrong Mobile Number'
                );
        res.redirect("back");
      }
    }
  })
}

module.exports.registerPost = function(req, res){
  Patients.findOne({ username: req.body.username }, function(err, user) {
    if (user) {
        req.flash(
                  'failure_msg',
                  'Patient Already Exists'
                );
        res.redirect('back');
      }else
      {
        Patients.create({username: req.body.username, name: req.body.name}, function(err, user) {
          if (err) {console.log('hi');}
          else{
              req.flash(
                  'success_msg',
                  'Patient Registered Successfully'
              );
              res.redirect("/patients/" + user.username + "/createreport");
          }       
        });
      }
  });
}

module.exports.createReportPost = function(req, res){
  const id = req.params.id;
  let name;
  Patients.find({username: id}, function(err, patient){
    if(err){
      console.log('80', err, '80');
      return;
    }else{
      name = patient[0].name;
      Reports.create({username: id, name: name, doctorName: req.user.name, status: req.body.status, date: req.body.date})
      req.flash(
                  'success_msg',
                  'Report Created Successfully'
              );
      res.redirect("/doctors/home")
    }
  })
}

module.exports.getStatusPost = function(req, res){  
    const status = req.body.status;
    Reports.find({status: status}, function(err, reports){
      if(err){
        console.log('150', err, '150');
        return;
      }
      else{
        if(reports.length != 0){
          console.log('154',reports,'154');
          res.render('status', {reports: reports});
        }else{
          res.render('no_records');
        }
      }
    })
}