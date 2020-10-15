const { ipcRenderer } = require('electron')
const cpp = require('./test.cc')

const fs = require('fs')

let Bback = document.getElementById('Bback');

Bback.addEventListener('click',e =>{
    console.log('Back pressed ')
    ipcRenderer.sendSync('back')
})

let BTestcpp = document.getElementById('BTestcpp');

BTestcpp.addEventListener('click',e =>{
    ipcRenderer.sendSync('test-cpp')

    console.time('c++');
    cpp.sum();
    console.timeEnd('c++')

})

