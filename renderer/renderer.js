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
    console.log(result);
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

    dracoCompressor.innerHTML = "Comprimindo";
    dracoCompressor.classList.add("loading-compression");
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
    dracoCompressor.innerHTML = "Comprimir";
    dracoCompressor.classList.remove("loading-compression");

    setTimeout(() => {
        message.classList.add("v-hidden");
    }, 4000);
}

filePicker.addEventListener("click", () => openDialogBox());
dracoCompressor.addEventListener("click", async () => {
    await saveDialogBox();
    const paths = {filePath: filePath, savePath: savePath}
    compression(paths);
});

// Drag and Drop 

const dropZone = document.querySelector(".dropzone");
const dropMessage = document.querySelector(".drop-message");

dropZone.addEventListener("dragover", (e) => {
    dropZone.classList.add("dragging");
    e.stopPropagation();
    e.preventDefault();
});

// dropZone.addEventListener("dragleave", (e) => {
//     dropZone.classList.remove("dragging");
//     e.stopPropagation();
//     e.preventDefault();
// });

// dropZone.addEventListener("dragend", (e) => {
//     dropZone.classList.remove("dragging");
//     e.stopPropagation();
//     e.preventDefault();
// });

dropMessage.addEventListener("dragover", (e) => {
    dropZone.classList.add("dragging");
    e.stopPropagation();
    e.preventDefault();
});

dropMessage.addEventListener("dragleave", (e) => {
    dropZone.classList.remove("dragging");
    e.stopPropagation();
    e.preventDefault();
});

dropMessage.addEventListener("dragend", (e) => {
    dropZone.classList.remove("dragging");
    e.stopPropagation();
    e.preventDefault();
});

dropMessage.addEventListener("drop", (e) => {
    dropZone.classList.remove("dragging");
    e.stopPropagation();
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if(!file.name.endsWith(".glb") && !file.name.endsWith(".gltf")){
        message.innerHTML = "Tipo de arquivo não suportado. Utilize apenas glb/gltf.";
        message.classList.remove("v-hidden");
        dracoCompressor.classList.add("v-hidden");
        fileSelected.innerHTML = "Nenhum arquivo selecionado";

        setTimeout(() => {
            message.classList.add("v-hidden");
        }, 4000);

        return;
    }

    filePath = file.path;
    dracoCompressor.classList.remove("v-hidden");
    fileSelected.innerHTML = "Arquivo: " + filePath;
});
