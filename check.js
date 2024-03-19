const { ipcRenderer } = require('electron');
let { algorithm, key, iv } = require('./main.js');

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-pin-form');
    const loginPin = document.getElementById('login-pin');
    //const loginError = document.getElementById('login-error-message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const pinInput = loginPin.value;

        ipcRenderer.send('verify-pin', {
            pinInput: pinInput,
            algorithm: algorithm,
            key: key,
            iv: iv
        });
    });
});

ipcRenderer.on('pin-verify-result', (isPinCorrect) => {
    if(isPinCorrect) {
        console.log('PIN is correct!');
        window.location.href = 'index.html';
    } else {
        console.log('PIN is false!');
    }
});