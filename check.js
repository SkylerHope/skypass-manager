const { ipcRenderer } = require('electron');
const crypto = require('crypto');
const fs = require('fs');

let algorithm = 'aes-256-cbc';
let data = fs.readFileSync('config.enc');
let key = data.slice(32);
let iv = data.slice(16);
let encryptedPin = data.slice(48);

let ivHex = iv.toString('hex');

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-pin-form');
    const loginPin = document.getElementById('login-input');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        let decipher = crypto.createDecipheriv(algorithm, key, ivHex);

        let decryptedPin = decipher.update(encryptedPin, 'hex', 'utf8');
    
        if (decryptedPin.toString() === loginPin.value) {
            console.log('PIN correct!');
            window.location.href = 'index.html';
        } else {
            console.log('PIN false!');
        }

        ipcRenderer.send('check-pin', loginPin.value);
    });
});