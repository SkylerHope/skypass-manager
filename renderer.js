const { ipcRenderer } = require('electron');

const pinInput = document.getElementById('pin-input');

document.getElementById('first-pin-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const pin = pinInput.value;

    ipcRenderer.send('save-pin', pin);
});

ipcRenderer.on('pin-save-status', (event, status) => {
    if(status.success) {
        console.log('PIN saved!');
    }
    else {
        console.error('Failed to save PIN: ', status.error);
    }
});