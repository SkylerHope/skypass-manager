const fs = require('fs');
const crypto = require('crypto');

const loginPin = document.getElementById('login-input');

let encryptedPin = fs.readFileSync('config.enc', 'utf8');

const algorithm = 'aes-256-cbc';

let iv2 = fs.readFileSync('config.enc', 'utf8').substring(0, 16);
let key2 = fs.readFileSync('config.enc', 'utf8').substring(0, 32);

const decipher = crypto.createDecipheriv(algorithm, Buffer.from (key2, 'hex'), Buffer.from(iv2, 'hex'));
let decryptedPin = decipher.update(encryptedPin, 'hex', 'utf8'); 
decryptedPin += decipher.final('utf8');

if (decryptedPin === loginPin.value) {
    window.location.href = 'index.html';
} else {
    const errorText = document.getElementById('login-error-message');
    errorText.style.display = 'block';
}