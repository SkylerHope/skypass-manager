const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const filePath = path.join(app.getPath('userData'), 'config.enc');

ipcMain.on('save-pin', (event, encryptedPin) => {
  /*const filePath = path.join(app.getPath('userData'), 'config.enc');*/

  fs.writeFile(filePath, encryptedPin, (err) => {
    if(err) {
      event.reply('pin-save-status', { success: false, error: err.message});
    }
    else {
      event.reply('pin-save-status', { success: true});
    }
  });
});

/*const PIN_FILE_PATH = path.join(app.getPath('userData'), 'config.enc');*/

const createWindow = () => {
  const win = new BrowserWindow({
      width: 800,
      height: 600,
      icon: path.join(__dirname, 'assets', 'img', 'favicon.png'),
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contentSecurityPolicy: "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
      }
  });

  if(fs.existsSync(filePath)) {
    win.loadFile('index.html');
  }
  else {
    win.loadFile('firstrun.html');
  }
  
  /*win.loadFile('index.html');*/
};

app.whenReady().then(createWindow)