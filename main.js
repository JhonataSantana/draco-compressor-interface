const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const { userSelectFile, userSaveFile } = require("./dialogWindow");
const { dracoCompression } = require("./gltfPipeline");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 650,
        height: 650,
        resizable: false,
        icon: path.join(__dirname, 'assets/icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    win.setMenu(null);

    win.loadFile('index.html');
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle("select-file-popup", async (_, args) => {
    const popupResults = await userSelectFile();

    return popupResults;
});

ipcMain.handle("save-file-popup", async (_, args) => {
    const popupResults = await userSaveFile();

    return popupResults;
});

ipcMain.handle("gltf-to-draco", async (_, args) => {
    const dracoResults = await dracoCompression(args);

    return dracoResults;
});
