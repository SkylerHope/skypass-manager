const fs = require('fs');
const crypto = require('crypto');

const loginPin = document.getElementById('login-input');

const encryptedPin = fs.readFileSync('config.enc', 'utf8');

const algorithm = 'aes-256-cbc';

const iv = fs.readFileSync('config.enc', 'utf8').substring(0, 16);
const key = fs.readFileSync('config.enc', 'utf8').substring(0, 32); 

const decipher = crypto.createDecipheriv(algorithm, Buffer.from (key, 'hex'), Buffer.from(iv, 'hex'));
let decryptedPin = decipher.update(encryptedPin, 'hex', 'utf8'); 
decryptedPin += decipher.final('utf8');

if (decryptedPin === loginPin.value) {
    window.location.href = 'index.html';
} else {
    const errorText = document.getElementById('login-error-message');
    errorText.style.display = 'block';
}