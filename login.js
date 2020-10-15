const { ipcRenderer } = require('electron')
const fs = require('fs')

const rawdata = fs.readFileSync('db.json');
const data = JSON.parse(rawdata);
console.log(data)

var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024); 

//WebSQL
db.transaction(function (tx) {   
    tx.executeSql('DROP TABLE IF EXISTS TEST');
   tx.executeSql('CREATE TABLE IF NOT EXISTS TEST (username, password)');
   tx.executeSql('INSERT INTO TEST (username, password) VALUES ("hardik", "password")'); 
   tx.executeSql('INSERT INTO TEST (username, password) VALUES ("hardik1", "logmsg")');  
});
let button = document.getElementById('Blogin');

button.addEventListener('click',e=>{
    const rawdata = fs.readFileSync('db.json');
    const data = JSON.parse(rawdata);
    console.log(data)
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

     ipcRenderer.send('login-status', {username,password})
})

ipcRenderer.on('login-status-back',args=>{
    console.log('halo avi gayu ',args);
});

let Bgoogle = document.getElementById('Bgoogle');

Bgoogle.addEventListener('click',e =>{
    console.log('google it ')
    ipcRenderer.sendSync('google')
})

let button_cpp = document.getElementById('Bcpp');

button_cpp.addEventListener('click',e =>{
    console.log('go to cpp ')
    ipcRenderer.sendSync('cpp')
})

let bExit = document.getElementById('BExit');

bExit.addEventListener('click',e =>{
    console.log('Exit pressed ')
    ipcRenderer.sendSync('exit')
})