// getting user name and email from url search
const userName = new URLSearchParams(window.location.search).get('name');
const userEmail = new URLSearchParams(window.location.search).get('email');

const firstNameSpan = document.getElementById('firstName');
const userEmailSpan = document.getElementById('userEmail');
const userOTP = document.getElementById('userOTP');
const validateBtn = document.getElementById('validateBtn');
const otpBox = document.querySelector('.otp-box');

// Getting Only First Name
const firstName = userName.split(' ')[0];

// Generated OTP
const randomOTP = Math.floor(1000 + Math.random() * 9000);
console.log("Random Generated OTP:", randomOTP);  

// Adding firstname and email to the message
firstNameSpan.innerHTML = firstName;
userEmailSpan.innerHTML = userEmail;

let attempts = 1;

validateBtn.addEventListener('click',()=>{
    const userenteredOTP = userOTP.value;
    // console.log(userenteredOTP);
    
    if (userenteredOTP == randomOTP) {
        otpBox.innerHTML = '<p>Validation Successful!</p>';
        setTimeout(() => {
            window.location.href = 'https://pixel6.co';
        }, 1000);  
    } else {
        if (attempts >= 3) {
            otpBox.innerHTML = '<p>Validation Failed!</p>';
            window.location.href = 'https://pixel6.co/404';
        } else {
            alert('Incorrect OTP, please try again.');
            userOTP.value = '';  
        }
        attempts++;
    }
    
})
