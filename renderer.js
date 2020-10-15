// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const remote = require('electron').remote;
const {app ,dialog,BrowserWindow} = remote;
let button = document.getElementById('Bexit');

button.addEventListener('click',e=>{
    console.log('exit clicked');
    onExit();
})

function onExit(){
    // dialog.showOpenDialog(BrowserWindow, {
    //     properties: ['openFile', 'openDirectory']
    //   }).then(result => {
    //     console.log(result.canceled)
    //     console.log(result.filePaths)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    alert("Quitting")
    console.log('works');
    setTimeout(()=>{
        document.getElementById("Bexit").innerText = 'done';
        app.quit();
    },10000)
  
}