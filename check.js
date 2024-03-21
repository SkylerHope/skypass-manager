const fs = require('fs');
const crypto = require('crypto');

const loginPin = document.getElementById('login-input');

const encryptedPin = fs.readFileSync('config.enc', 'utf8');

const iv = fs.readFileSync('config.enc', 'utf8').substring(0, 16);

const encryptionKey = fs.readFileSync('config.enc', 'utf8').substring(0, 32);

const algorithm = 'aes-256-cbc';

const decipher = crypto.createDecipheriv(algorithm, encryptionKey, iv);
let decryptedPin = decipher.update(encryptedPin, 'utf8', 'utf8');
decryptedPin += decipher.final('utf8');

if (decryptedPin === loginPin.value) {
    window.location.href = 'index.html';
} else {
    const errorText = document.getElementById('login-error-message');
    errorText.style.display = 'block';
}