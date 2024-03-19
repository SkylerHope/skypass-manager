const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const decryptPin = require('./check');

const createWindow = () => {
  const win = new BrowserWindow({
      width: 800,
      height: 600,
      icon: path.join(__dirname, 'assets', 'img', 'favicon.png'),
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        preload: path.join(__dirname, 'preload.js'),
        contentSecurityPolicy: "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
      }
  });

  const appDirectory = __dirname;
  const pinFilePath = path.join(appDirectory, 'config.enc');

  if(fs.existsSync(pinFilePath)) {
    win.loadFile('login.html');
  }
  else {
    win.loadFile('firstrun.html');
  }

};

app.whenReady().then(createWindow)

let algorithm, key, iv;

ipcMain.on('save-pin', (event, pin) => {
  algorithm = 'aes-256-cbc';
  key = crypto.randomBytes(32);
  iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encryptedPin = cipher.update(pin, 'utf8', 'hex');
  encryptedPin += cipher.final('hex');

  const appDirectory = __dirname;
  const pinFilePath = path.join(appDirectory, 'config.enc');
  fs.writeFileSync(pinFilePath, JSON.stringify({ encryptedPin, iv }));

  event.reply('pin-save-status', { success: true });
});

module.exports = { algorithm, key, iv };