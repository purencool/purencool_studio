'use strict'

// Performance video https://www.youtube.com/watch?v=CmsA5CfQNN8
//https://www.youtube.com/watch?v=QD9hpiBZQvA
// UI video https://www.youtube.com/watch?v=h6MB62_5zzQ
// Import parts of electron to use
const {app, BrowserWindow, shell ,  ipcMain} = require('electron')

const fs = require('fs')
const path = require('path')
const url = require('url')
const os = require('os');
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer')
shell.openExternal('http://localhost:3000')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'main.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
    app.quit()
//   }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('show-message', (event, msg) => {
    if (mainWindow) {
      mainWindow.webContents.send('show-message', msg);
    }

})
