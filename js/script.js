//DOM - MODELO DE OBJETO DE DOCUMENTO

document.getElementById("toggleInfo").addEventListener("click", function() {
    const infoSection = document.querySelector(".info");

    if (infoSection.classList.contains("oculto")) {
        infoSection.classList.remove("oculto");
        this.textContent = "Ocultar Información Personal";
    } else {
        infoSection.classList.add("oculto");
        this.textContent = "Mostrar Información Personal";
    }

});

//fincion para cambiar fot de perfil

const upload= document.getElementById("upload");
const preview= document.getElementById("preview");
uploadBtn = document.querySelector(".upload-btn");

upload.addEventListener("change", function() {  
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            preview.src = e.target.result;
            uploadBtn.style.display = "none";   
        };

        reader.readAsDataURL(file);
    }
});

preview.addEventListener("click", function() {
    upload.click();
});
