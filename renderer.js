const { ipcRenderer } = require('electron');

let pin;

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('first-pin-form');
    const pinInput = document.getElementById('pin-input');
    const vpinInput = document.getElementById('vpin-input');
    const pinError = document.getElementById('pin-error-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        pin = pinInput.value;
        const vpin = vpinInput.value;

        if(pin === vpin) {
            ipcRenderer.send('save-pin', pin);
        }
        else {
            pinError.style.display = 'block';
        }
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

module.exports = pin;