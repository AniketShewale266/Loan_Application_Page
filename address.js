const userName = new URLSearchParams(window.location.search).get('name');

const usernameSpan = document.getElementById('username');
// console.log(usernameSpan);

// console.log(userName);

usernameSpan.textContent =`Welcome ${userName}, Enter your Address Details`;
