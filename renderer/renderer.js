const filePicker = document.querySelector(".file-picker");

async function openDialogBox(){
    const result = await api.openDialog();
    console.log(result);
}

filePicker.addEventListener("click", () => openDialogBox());