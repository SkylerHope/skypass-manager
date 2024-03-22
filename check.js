const fs = require('fs');
const crypto = require('crypto');
const loginForm = document.getElementById('login-pin-form');
const loginPin = document.getElementById('login-input');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let data = fs.readFileSync('config.enc', 'utf8');
    let parsedData = JSON.parse(data);
    let iv2 = Buffer.from(parsedData.iv, 'hex');
    let key2 = Buffer.from(parsedData.key, 'hex');

    let decipher = crypto.createDecipheriv('aes-256-cbc', key2, iv2);
    let decryptedPin = decipher.update(parsedData.encryptedPin, 'hex', 'hex');
    decryptedPin += decipher.final('hex');

    if (decryptedPin === loginPin.value) {
        window.location.href = 'index.html';
    } else {
        const errorText = document.getElementById('login-error-message');
        errorText.style.display = 'block';
    }
});