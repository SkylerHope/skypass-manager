const crypto = require('crypto');
let { algorithm, key, iv } = require('./main');

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-pin-form');
    const loginError = document.getElementById('login-error-message');
    const loginPin = document.getElementById('login-pin');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const pinInput = loginPin.value;

        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
        
        try {
            let decryptedPin = decipher.update(pinInput, 'hex', 'utf8');
            decryptedPin += decipher.final('utf8');

            if(pinInput === decryptedPin) {
                console.log('PIN is correct!');
                window.location.href('index.html');
            } else {
                console.log('PIN is false!');
                loginError.style.display = 'block';
            }
        } catch (error) {
            console.error('Error decrypting PIN: ', error.message);
            loginError.style.display = 'block';
        }
    });
});