const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

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

app.whenReady().then(createWindow);

ipcMain.on('save-pin', (event, pin) => {
  const algorithm = 'aes-256-cbc';
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encryptedPin = cipher.update(pin, 'utf8', 'hex');
  encryptedPin += cipher.final('hex');

  const appDirectory = __dirname;
  const pinFilePath = path.join(appDirectory, 'config.enc');
  fs.writeFileSync(pinFilePath, JSON.stringify({ encryptedPin: encryptedPin.toString(), iv: iv.toString() }));

  event.reply('pin-save-status', { success: true, algorithm, key: key.toString('hex'), iv: iv.toString('hex') });
});