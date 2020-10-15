console.log('TCP loaded')

const { ipcRenderer } = require('electron')

ipcRenderer.sendSync('TCP')