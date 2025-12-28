const loginBtn = document.querySelector('.login_btn');
const signupBtn = document.querySelector('.signup_btn');
const loginBox = document.querySelector('.loginbox');
const signupBox = document.querySelector('.signupbox');

// Ensure both forms are hidden on initial load
document.addEventListener('DOMContentLoaded', () => {
    loginBox.classList.add('hide');
    signupBox.classList.add('hide');
});

loginBtn.addEventListener('click', () => {
    // Show the login form by removing the 'hide' class
    loginBox.classList.remove('hide');
    // Hide the signup form by adding the 'hide' class
    signupBox.classList.add('hide');
});

signupBtn.addEventListener('click', () => {
    // Show the signup form by removing the 'hide' class
    signupBox.classList.remove('hide');
    // Hide the login form by adding the 'hide' class
    loginBox.classList.add('hide');
});