var exampleInputId = document.getElementById('exampleInputId');
var exampleInputPassword = document.getElementById('exampleInputPassword');
var form = document.getElementById('form')

exampleInputId.onkeypress = removeRedBorder(exampleInputId);
exampleInputPassword.onkeypress = removeRedBorder(exampleInputPassword);

function removeRedBorder(id) {
    return function(){
        document.getElementById(id.id).className = "input-box";
        document.getElementById(id.id).classList.add("form-control");
        document.getElementById(id.name).innerHTML = ""
    }
}
function validateForm(e) {
    var names = ['username', 'password'];
    names.forEach(function(el) {
    var val = document.forms["form"][el].value;
    if (val == null || val == "") {
        document.forms["form"][el].classList.add('red');
        document.getElementById(el).classList.add('error');
        document.getElementById(el).innerHTML = "***" + el + " must be filled out";
        error = true;
    }
    });
    
    if (error) return false;
}

form.onsubmit = validateForm;