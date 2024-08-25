// Elementos DOM
const btmEncrypt = document.querySelector("#encrypt");
const btmDecrypt = document.querySelector("#decrypt");
const btmClear = document.querySelector("#clear-text");
const btmCopy = document.querySelector("#copy-text");
const outputText = document.querySelector("#output-text");
const txtEncrypt = document.querySelector("#input-text");
const alertMessage = document.querySelector("#input-alert");

let lastAction = null; 

// Funcion para Encripart el Texto
function textEncrypt(text) {
    let expandText = text.normalize("NFD").replace(/[$\.¿\?~!\¡@#%^&*()_|}\{[\]>\<:"`;,\u0300-\u036f']/g, "");
    
    if (text === "") {

        outputText.innerHTML = ""; 

        return "El campo de texto no debe estar vacío.";
    } else if (text !== expandText && text !== text.toLowerCase()) {
        return "El texto debe estar en minúsculas y no tener caracteres especiales.";
    } else if (text !== text.toLowerCase()) {
        return "El texto debe estar en minúsculas.";
    } else if (text !== expandText) {
        return "El texto no debe contener acentos ni caracteres especiales.";
    } else {  //Encriptacion
        let encryptText = text.replace(/e/g, "enter")
                                .replace(/i/g, "imes")
                                .replace(/a/g, "ai")
                                .replace(/o/g, "ober")
                                .replace(/u/g, "ufat");
        return encryptText;
    }
}

// Funcion para Desencriptar el Texto
function textDecrypt(text) {
    let expandText = text.normalize("NFD").replace(/[$\.¿\?~!\¡@#%^&*()_|}\{[\]>\<:"`;,\u0300-\u036f']/g, "");

    if (text === "") {

        outputText.innerHTML = ""; 

        return "El campo de texto no debe estar vacío.";
    } else if (text !== expandText && text !== text.toLowerCase()) {
        return "El texto debe estar en minúsculas y no tener caracteres especiales.";
    } else if (text !== text.toLowerCase()) {
        return "El texto debe estar en minúsculas.";
    } else if (text !== expandText) {
        return "El texto no debe contener acentos ni caracteres especiales.";
    } else { //Desencriptacion
        let decryptText = text.replace(/enter/gm, "e")
                                .replace(/imes/gm, "i")
                                .replace(/ai/gm, "a")
                                .replace(/ober/gm, "o")
                                .replace(/ufat/gm, "u");
        return decryptText;
    }
}

// Funcion para reiniciar el encriptador (Borrar)
function clearText() {
    txtEncrypt.value = ""; 
    outputText.innerHTML = ""; 

    alertMessage.textContent = "Solo letras minúsculas y sin acentos.";
    
    btmCopy.style.visibility = "hidden"; 
    btmClear.style.visibility = "hidden";
}

// Funcion para Resaltar Boton(Encriptar/Desencriptar) Activo
function setActiveButton(activeButton) {
    btmEncrypt.classList.remove("btm-active");
    btmDecrypt.classList.remove("btm-active");
    activeButton.classList.add("btm-active");
}

// Evento (click) del boton Encriptar
btmEncrypt.addEventListener("click", (e) => {
    e.preventDefault();
    setActiveButton(btmEncrypt);

    lastAction = 'encrypt';

    const text = txtEncrypt.value;
    const result = textEncrypt(text);
    
    if (result.includes("El")) {
        
        if (result.includes("El campo de texto no debe estar vacío")) {
            alertMessage.textContent = result;

            btmCopy.style.visibility = "hidden";
            btmClear.style.visibility = "hidden";
        } else {
            alertMessage.textContent = result;
        
            btmCopy.style.visibility = "hidden";
            btmClear.style.visibility = "inherit";
        }
    } else {
        alertMessage.textContent = "Solo letras minúsculas y sin acentos.";
        outputText.innerHTML = result;
        btmCopy.style.visibility = "inherit";
        btmClear.style.visibility = "inherit";
    }
});

// Evento (click) del boton Desencriptar
btmDecrypt.addEventListener("click", (e) => {
    e.preventDefault();
    setActiveButton(btmDecrypt); 

    lastAction = 'decrypt'; 

    const text = txtEncrypt.value;
    const result = textDecrypt(text);

    if (result.includes("El")) {

        if (result.includes("El campo de texto no debe estar vacío")) {
            alertMessage.textContent = result;

            btmCopy.style.visibility = "hidden";
            btmClear.style.visibility = "hidden";
        } else {
            alertMessage.textContent = result;
        
            btmCopy.style.visibility = "hidden";
            btmClear.style.visibility = "inherit";
        }

    } else {
        alertMessage.textContent = "Solo letras minúsculas y sin acentos.";

        outputText.innerHTML = result;
        btmCopy.style.visibility = "inherit";
        btmClear.style.visibility = "inherit";
    }
});

// Evento (click) del campo de Entrada
txtEncrypt.addEventListener("input", () => {

    if (txtEncrypt.value.trim() === "") {
        btmClear.style.visibility = "hidden";
        btmCopy.style.visibility = "hidden";
        
    } else if (outputText.value.trim() === "") {
        btmClear.style.visibility = "inherit";
        btmCopy.style.visibility = "hidden";
  
    } else {
        btmClear.style.visibility = "inherit";
        btmCopy.style.visibility = "inherit";
    }

    if (lastAction === 'encrypt') {
        const result = textEncrypt(txtEncrypt.value);
        
        if (!result.includes("El")) {
            outputText.innerHTML = result;
            alertMessage.textContent = "Solo letras minúsculas y sin acentos.";
        } else {
            alertMessage.textContent = result;
        } 

    } else if (lastAction === 'decrypt') {
        const result = textDecrypt(txtEncrypt.value);
        if (!result.includes("El")) {
            outputText.innerHTML = result;
            alertMessage.textContent = "Solo letras minúsculas y sin acentos.";
        } else {
            alertMessage.textContent = result;
        } 
    }
});

// Evento (click) del boton Copiar
btmCopy.addEventListener("click", (e) => {
    e.preventDefault();
    const textToCopy = outputText.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
        
    }).catch(err => {
        alert("Error al copiar el texto.");
    });
});

// Evento (click) del boton Borar
btmClear.addEventListener("click", (e) => {
    e.preventDefault();
    clearText();
    
    btmClear.style.visibility = "hidden";
    btmCopy.style.visibility = "hidden";
});

