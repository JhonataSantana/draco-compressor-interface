const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const { userSelectFile } = require("./dialogWindow");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 600,
        height: 600,
        resizable: false,
        icon: path.join(__dirname, 'assets/icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    // win.setMenu(null);

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

ipcMain.handle("select-file-popup", async (handler, args) => {
    const popupResults = await userSelectFile();

    return popupResults;
})
