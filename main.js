const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
      width: 800,
      height: 600,
      icon: path.join(__dirname, 'assets', 'img', 'favicon.ico'),
      webPreferences: {
        contentSecurityPolicy: "script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
      }
  });
  
  win.loadFile('index.html');
};

app.whenReady().then(createWindow)