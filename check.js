const crypto = require('crypto');
let key = require('./main').encryptionKey;

module.exports = {
    verifyPin: function(encryptedPin, iv, userInput) {
        const algorithm = 'aes-256-cbc';

        const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
        let decryptedPin = decipher.update(encryptedPin, 'hex', 'utf8');
        decryptedPin += decipher.final('utf8');

        return userInput === decryptedPin;
    }
};