const filePicker = document.querySelector(".file-picker");
const fileSelected = document.querySelector(".file-path");
const dracoCompressor = document.querySelector(".compression-start");
const message = document.querySelector(".message");
let filePath = "";
let savePath = "";

async function openDialogBox() {
    const result = await api.openDialog();

    if (result.canceled) {
        filePath = "";
        dracoCompressor.classList.add("v-hidden");
        fileSelected.innerHTML = "Nenhum arquivo selecionado";
        return;
    }

    filePath = result.filePaths[0];
    dracoCompressor.classList.remove("v-hidden");
    fileSelected.innerHTML = "Arquivo: " + filePath;
}

async function saveDialogBox() {
    const result = await api.saveDialog();

    if (result.canceled) {
        savePath = "";
        return;
    }

    savePath = result.filePath;
}

async function compression(paths) {

    if (paths.filePath == "") return;
    if (paths.savePath == "") return;

    const result = await api.dracoCompression(paths);

    if(result.compression){
        message.innerHTML = "Modelo compactado com sucesso!";
        message.classList.remove("v-hidden");
        dracoCompressor.classList.add("v-hidden");
        fileSelected.innerHTML = "Nenhum arquivo selecionado";
        filePath = "";
    }else{
        message.innerHTML = "Falha ao compactar o Modelo.";
    }
    
    savePath = "";

    setTimeout(() => {
        message.classList.add("v-hidden");
    }, 3000);
}

filePicker.addEventListener("click", () => openDialogBox());
dracoCompressor.addEventListener("click", async () => {
    await saveDialogBox();
    const paths = {filePath: filePath, savePath: savePath}
    compression(paths);
});
