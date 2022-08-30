const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    openDialog: () => ipcRenderer.invoke('select-file-popup', true),
    saveDialog: () => ipcRenderer.invoke('save-file-popup', true),
    dracoCompression: (paths) => ipcRenderer.invoke('gltf-to-draco', paths)
});
