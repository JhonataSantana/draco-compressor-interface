const filePicker = document.querySelector(".file-picker");

filePicker.addEventListener("click", () => {
    // window.dialog.filePicker();
    const dialogConfig = {
        properties: ['openFile'],
        filters: [{ name: 'Imagens', extensions: ['jpg', 'png', 'gif'] }]
    }
    electron.openDialog('showOpenDialog', dialogConfig)
        .then(result => console.log(result));
});