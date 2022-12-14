const { dialog } = require("electron");

async function userSelectFile() {

    return new Promise((success, reject) => {

        const result = dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [{ name: "Modelos 3D", extensions: ['glb', 'gltf'] }]
        });

        result.then((results) => {
            success(results);
        });

        result.catch((error) => {
            reject(error);
        });

    });

}

async function userSaveFile(){

    return new Promise((success, reject) => {

        const result = dialog.showSaveDialog({
            filters: [{ name: "Modelos 3D", extensions: ['gltf'] }]
        });
    
        result.then((results) => {
            success(results);
        });
    
        result.catch((error) => {
            reject(error);
        });

    });

}

module.exports = {
    userSelectFile: userSelectFile,
    userSaveFile: userSaveFile
}