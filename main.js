const { app, BrowserWindow } = require('electron')

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 1200,
    height: 720,
    frame: false,
    backgroundColor: '#343a40',
    icon: "./logos/logo.png",
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

