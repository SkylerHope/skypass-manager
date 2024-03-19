const crypto = require('crypto');
let { algorithm, key, iv } = require('./main');

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-pin-form');
    const loginError = document.getElementById('login-error-message');
    const loginPin = document.getElementById('login-pin');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decryptedPin = decipher.update()
    })
})