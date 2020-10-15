// Modules
const {app, BrowserWindow ,dialog} = require('electron')
const { ipcMain } = require('electron')
var Promise = require('promise');
//const cpp = require('./test.cc');

//console.log(cpp.demo.hello());


var net = require('net');
const Alert = require("electron-alert");

//SQL connection
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE IF NOT EXISTS db.creds (username VARCHAR(40), password VARCHAR(40))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, DisplayHeight,DisplayWidth;
// Create a new BrowserWindow when `app` is ready
function createWindow () {
  let {width, height} = require('electron').screen.getPrimaryDisplay().size
  DisplayHeight = height ;
  DisplayWidth = width;
  mainWindow = new BrowserWindow({
    width,height,
    webPreferences: { 
      nodeIntegration: true 
    },
    frame:false,
    options:{
			fullscreen:true
    },
    es6 : true
  })
  // Load index.html into the new BrowserWindow
  mainWindow.loadFile('login.html');

  // Open DevTools - Remove for PRODUCTION!
  //mainWindow.webContents.openDevTools();

  // Listen for window being closed
  mainWindow.on('closed',  () => {
    mainWindow = null
  })
}
function checkCreads (usnm,pwd){
      return new Promise((resolve,reject)=>{
        con.query("SELECT * FROM db.creds",function(err, result) {
        if(result){
          for(var i in result){
            if(usnm === result[i].username && pwd === result[i].password){
                 resolve('true')
            }}
            reject('invalid cred reject from resolve')
        }
      })
    })
}
ipcMain.on('login-status', (event, arg) => {
  checkCreads(arg.username,arg.password).then((response)=>{
    console.log('isLogin : ' , response)
        let swalOptions = {
          position: "center",
          title: "Signed in successfully",
          type: "success",
         // showConfirmButton: true,
          timer: 2000
        };
        Alert.fireToast(swalOptions); 
        event.sender.send('login-status-back', true)
  }).catch((err)=>{
    console.log(err)
    let swalOptions = {
      position: "center",
      title: "Invalid credentials",
      type: "failure",
      showConfirmButton: true,
      //timer: 3000
    };
    Alert.fireToast(swalOptions);
    event.sender.send('login-status-back', false)
  })
    // console.log('isLogin : ' , loginstatus)
    // if(loginstatus === 1){
    //     let swalOptions = {
    //       position: "center",
    //       title: "Signed in successfully",
    //       type: "success",
    //      // showConfirmButton: true,
    //       timer: 2000
    //     };
    //     Alert.fireToast(swalOptions);
    //   }else{
    //       let swalOptions = {
    //         position: "center",
    //         title: "Invalid credentials",
    //         type: "failure",
    //         showConfirmButton: true,
    //         //timer: 3000
    //       };
    //       Alert.fireToast(swalOptions);
    //     }
      event.sender.send('login-acknowledge', 'received - acknowledge')
        
        console.log('replied to login.js')
  });
  

let googlewindow;
ipcMain.on('google', () => {
  cppWindow.loadFile('tcp.js');
  //load('https://www.google.com/');
  //mainWindow.close();
});

ipcMain.on('TCP', () => {
  console.log('dsfdsvvfdgdfgfvdfbdfb')
  //mainWindow.close();
});

var client = new net.Socket();
client.connect(9000, '127.0.0.1', function() {
console.log('Connected');
//client.write('Hello, server! Love, Client.');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); 
});

client.on('close', function() {
	console.log('Connection closed');
});
client.on('error', function() {
	console.log('error');
});


function load(url) {
  googlewindow= new BrowserWindow({width: 1380, height: 790,
    webPreferences: { 
      nodeIntegration: true 
    },
    title : "Google Window",
      parent: mainWindow,
       modal: true,
    //frame:false,
    options:{
			fullscreen:true
    }
  });
  googlewindow.loadURL(url);
  
  googlewindow.on('closed',()=>{
    if (mainWindow === null) createWindow()
    googlewindow = null;
    mainWindow.reload();
  })
}

ipcMain.on('exit', () => {
  app.quit();
  //mainWindow.close();
});

let cppWindow;
ipcMain.on('cpp', () => {
  console.log('cpp called');
    ///let {width, height} = require('electron').screen.getPrimaryDisplay().size
    cppWindow = new BrowserWindow({
      width: DisplayWidth, height: DisplayHeight,
      webPreferences: { 
        nodeIntegration: true 
      },
      title : "CPP Test",
      parent: mainWindow,
       modal: true,
      frame:false,
      options:{
        fullscreen:true
      }
    })
    cppWindow.loadFile('cpp.html');
    //cppWindow.webContents.openDevTools();
    cppWindow.on('closed',  () => {
      cppWindow = null
      mainWindow.reload();
    })
  //mainWindow.close();
});
// Electron `app` is ready
app.on('ready', createWindow)

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

ipcMain.on('back', () => {
  console.log('back to main window')
  cppWindow.close();
});

ipcMain.on('test-cpp', () => {
  console.log('TestCPP pressed ')
});

