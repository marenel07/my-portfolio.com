let menu = document.querySelector('#menu-bars');
let header = document.querySelector('header');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    header.classList.toggle('active');
}

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    header.classList.remove('active');
}

let cursor1 = document.querySelector('.cursor-1');
let cursor2 = document.querySelector('.cursor-2');

window.onmousemove = (e) =>{
    cursor1.style.top = e.pageY + 'px';
    cursor1.style.left = e.pageX + 'px';
    cursor2.style.top = e.pageY + 'px';
    cursor2.style.left = e.pageX + 'px';
}

document.querySelectorAll('a').forEach(links =>{

    links.onmouseenter = () =>{
        cursor1.classList.add('active');
        cursor2.classList.add('active');
    }

    links.onmouseleave = () =>{
        cursor1.classList.remove('active');
        cursor2.classList.remove('active');
    }
});

//Send Email in Form
//Variables
const sendBtn= document.getElementById('sendBtn'),
subject = document.getElementById('subject'),
email = document.getElementById('email'),
number = document.getElementById('number'),
message = document.getElementById('message'),
sendEmailForm = document.getElementById('email-form');

//Event Listeners

eventListeners ();
function eventListeners () {
    //App Init
    document.addEventListener('DOMContentLoaded', appInit);

    //Validate the Form
    subject.addEventListener('blur', validateField);
    email.addEventListener('blur', validateField);
    number.addEventListener('blur', validateField);
    message.addEventListener('blur', validateField);
    
    //Send Email
    sendEmailForm.addEventListener('submit', sendEmail);
}

//Functions

//App Initialization
function appInit () {
    //Disable the send button on load
    sendBtn.disabled = true;
}

function sendEmail(e) {
    e.preventDefault();

    //Show the Spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'block';

    //Show the image
    const sendEmailImg = document.createElement('img');
    sendEmailImg.src = 'images/mail.gif';
    sendEmailImg.style.display = 'block';

    //Hide Spinner then show the send Email Image
    setTimeout(function () {
        //Hide the Spinner
        spinner.style.display = 'none';

        //Show the image
        document.querySelector('#loaders').appendChild ( sendEmailImg );

        //After 5 seconds, hide the image and reset the form
        setTimeout(function() {
            sendEmailForm.reset();
            sendEmailImg.remove();
        }, 5000);
    }, 3000);
}

//Validate the Fileds
function validateField() {
    let errors;

    //Validate the Length of the Filed
    validateLength(this);

    //Validate the email
    if(this.tye === 'email') {
        validateEmail(this);
    }

    //Both will return errors, then check if there are any errors
    errors = document.querySelectorAll('.error');

    //Check that the inputs are not empty
    if(subject.value !== '' && email.value !== '' && number.value !== '' && message.value !== '') {
        if(errors.length ===0) {
            //The button should be enabled
            sendBtn.disabled = false;
        }
    }
}
//Validate teh Length of the Fileds
function validateLength (field) {
    if(field.value.length > 0) {
        field.style.borderBottomColor = 'green';
        field.classList.remove('error');
    } else {
        field.style.borderBottomColor = 'red';
        field.classList.add('error')
    }
}
//Validate Email (checks for @ in the value)

function validateEmail (field) {
    let emailText = field.value;
    //Check if the email contains @sign
    if(emailText.indexOf('@') !== -1) {
        field.style.borderBottomColor = 'green';
        field.classList.remove('error');
    } else {
        field.style.borderBottomColor = 'red';
        field.classList.add('error')
    }
    function resetForm () {
        sendEmailForm.reset();
    }
}