'use strict';

var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;
var mainWindow = null;
var ipc = require('electron').ipcMain;
const os = require('os');
const { dialog } = require('electron');


ipc.on('close-main-window', () => {
  app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    resizable: true,
    height: 800,
    width: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('index.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});




ipc.on('open-file-dialog-for-file', (event) => {
  if (os.platform() === 'linux' || os.platform() === 'win32') {
    dialog.showOpenDialog({
      properties: ['openFile']
    }, (files) => {
      if (files) event.sender.send('selected-file', files[0]);
    });
  } else {
    dialog.showOpenDialog({
      properties: ['openFile', 'openDirectory']
    }, (files) => {
      if (files) event.sender.send('selected-file', files[0]);
    });
  }
});
