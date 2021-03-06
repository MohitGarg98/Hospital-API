var exampleInputName1 = document.getElementById('exampleInputName1');
var exampleInputId = document.getElementById('exampleInputId');
var exampleInputPassword1 = document.getElementById('exampleInputPassword1');
var exampleInputCPassword1 = document.getElementById('exampleInputCPassword1');
var exampleInputEmail2 = document.getElementsByTagName('input');
var form = document.getElementById('form')

exampleInputName1.onkeypress = removeRedBorder(exampleInputName1);
exampleInputId.onkeypress = removeRedBorder(exampleInputId);
exampleInputPassword1.onkeypress = removeRedBorder(exampleInputPassword1);
exampleInputCPassword1.onkeypress = removeRedBorder(exampleInputCPassword1);

function removeRedBorder(id) {
    return function(){
        document.getElementById(id.id).className = "input-box";
        document.getElementById(id.id).classList.add("form-control");
        document.getElementById(id.name).innerHTML = ""
    }
}

function validateForm(e) {
    var error = false;
    var text = exampleInputPassword1.value;
    console.log(text.length);
    var regx = /[^A-Za-z0-9]/;
    if(!regx.test(text) || text.length < 6){
        document.getElementById('password').innerHTML = "password must be greater than 6 and include a special symbol";
        document.getElementById('password').classList.add('error');
        document.forms["form"]['password'].classList.add('red');
        error = true;
    }
    var names = ['name', 'username', 'password', 'cpassword'];
    names.forEach(function(el) {
    var val = document.forms["form"][el].value;
    if (val == null || val == "") {
        console.log("p"+el);
        document.forms["form"][el].classList.add('red');
        document.getElementById(el).classList.add('error');
        if(el === 'cpassword'){
            document.getElementById(el).innerHTML = "***confirm password must be filled out";
        }
        else{
            document.getElementById(el).innerHTML = "***" + el + " must be filled out";
        }
        error = true;
    }
    });    
    if(exampleInputPassword1.value !== exampleInputCPassword1.value)
    {
        document.getElementById('cpassword').innerHTML = "***password doesn't match";
        document.forms["form"]['cpassword'].classList.add('red');
        error = true;
    }
    
    if (error) return false;
}

form.onsubmit = validateForm;