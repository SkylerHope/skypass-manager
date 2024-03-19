const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('first-pin-form');
    const pinInput = document.getElementById('pin-input');
    const vpinInput = document.getElementById('vpin-input');
    const pinError = document.getElementById('pin-error-message');

    const loginForm = document.getElementById('login-pin-form');
    const loginPin = document.getElementById('login-pin');
    //const loginError = document.getElementById('login-error-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const pin = pinInput.value;
        const vpin = vpinInput.value;

        if(pin === vpin) {
            ipcRenderer.send('save-pin', pin);
        }
        else {
            pinError.style.display = 'block';
        }
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const pinInput = loginPin.value;

        ipcRenderer.send('verify-pin', pinInput);
    });
});

ipcRenderer.on('pin-save-status', (event, status) => {
    if(status.success) {
        console.log('PIN saved!');
        window.location.href = 'login.html';
    }
    else {
        console.error('Failed to save PIN: ', status.error);
    }
});

ipcRenderer.on('pin-verify-result', (event, isPinCorrect) => {
    if(isPinCorrect) {
        console.log('PIN is correct!');
        window.location.href('index.html');
    } else {
        console.log('PIN is false!');
    }
});