const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    openDialog: (method, config) => ipcRenderer.invoke('dialog', method, config)
});

// contextBridge.exposeInMainWorld('dialog', {
//     filePicker: () => {
//         dialog.showOpenDialog({
//             properties: ['openFile'],
//             filters: [{ name: 'Imagens', extensions: ['jpg', 'png', 'gif'] }]
//         });
//     },
// })
