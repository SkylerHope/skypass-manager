let pin = require('./renderer');
const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-pin-form');
    const input = document.getElementById('login-input');
    const loginError = document.getElementById('login-error-message');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const loginInput = input.value;

        if(loginInput === pin) {
            ipcRenderer.send('login-pin', pin);
        } else {
            loginError.style.display = 'block';
        }
    });
});

ipcRenderer.on('login-status', (event, status) => {
    if(status.success) {
        console.log('Successful login!');
        window.location.href('index.html');
    } else {
        console.error('Failed to log in: ', status.error);
    }
});