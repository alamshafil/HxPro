const { app, BrowserWindow } = require('electron')

let win;

const { autoUpdater } = require("electron-updater");

autoUpdater.checkForUpdatesAndNotify();

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    backgroundColor: '#343a40',
    icon: "./logo.png",
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })

  win.loadFile('./index.html')

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

