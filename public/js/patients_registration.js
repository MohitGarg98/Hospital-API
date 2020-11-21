var exampleInputId = document.getElementById('exampleInputId');
var exampleInputName = document.getElementById('exampleInputName');
var form = document.getElementById('form')

exampleInputId.onkeypress = removeRedBorder(exampleInputId);
exampleInputName.onkeypress = removeRedBorder(exampleInputName);

function removeRedBorder(id) {
    return function(){
        document.getElementById(id.id).className = "input-box";
        document.getElementById(id.id).classList.add("form-control");
        document.getElementById(id.name).innerHTML = ""
    }
}
function validateForm(e) {
    var names = ['name', 'username'];
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