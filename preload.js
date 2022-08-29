const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    openDialog: () => ipcRenderer.invoke('select-file-popup', true)
});
