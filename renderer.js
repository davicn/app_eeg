// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const ipc = require('electron').ipcRenderer

const buttonCreated = document.getElementById('upload')

buttonCreated.addEventListener('click', (event) => {
    ipc.send('open-file-dialog-for-file')
})

ipc.on('selected-file', function (event, path) {
    window.confirm()
    if (confirm("Press a button!")) {
        txt = "You pressed OK!";
    } else {
        txt = "You pressed Cancel!";
    }
    //alert('Full path: ' + path);
});