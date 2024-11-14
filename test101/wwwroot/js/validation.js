document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formPrincipal");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let hasErrors = false;
        debugger;

        const nombreCliente = document.getElementById("NombreCliente");
        if (!nombreCliente.value.trim()) {
            showError(nombreCliente, "El nombre es obligatorio.");
            hasErrors = true;
        } else {
            clearError(nombreCliente);
        }

        const direccionCliente = document.getElementById("DireccionCliente");
        if (!direccionCliente.value.trim()) {
            showError(direccionCliente, "La dirección es obligatoria.");
            hasErrors = true;
        } else {
            clearError(direccionCliente);
        }

        const pdfInput = document.getElementById("NroDocumento");
        if (!pdfInput.value.trim()) {
            showError(pdfInput, "El numero de documento es obligatorio.");
            hasErrors = true;
        } else {
            clearError(pdfInput);
        }

        if (hasErrors) return;
        mostrarPdf();
    });

    function showError(input, message) {
        input.classList.add("border-red-500");
        const errorSpan = input.nextElementSibling;
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }

    function clearError(input) {
        input.classList.remove("border-red-500");
        const errorSpan = input.nextElementSibling;
        if (errorSpan) {
            errorSpan.textContent = "";
        }
    }

    
});

async function mostrarPdf() {
    debugger;
    const formData = new FormData(document.getElementById("formPrincipal"));
    const NombreCliente = formData.get("NombreCliente");
    const DireccionCliente = formData.get("DireccionCliente");
    const NumeroDocumento = formData.get("NroDocumento");
    const request = {
        NombreCliente,
        DireccionCliente,
        NumeroDocumento
    };
    const response = await fetch('/Cliente/GetPdfContent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request),
    });
    debugger;

    if (response.ok) {
        const pdfBase64 = await response.json();
        const pdfBlob = base64ToBlob(pdfBase64, 'application/pdf');
        request.Pdf = pdfBase64;
        await crearCliente(request);
        document.getElementById("pdfEmbed").src = `data:application/pdf;base64,${pdfBase64}`;
        document.getElementById("pdfModal").classList.remove("hidden");
    } else {
        alert('Error al obtener el PDF');
    }
}

// Función para cerrar la modal
function cerrarModal() {
    document.getElementById("pdfModal").classList.add("hidden");
}

function base64ToBlob(base64, mimeType) {
    const byteCharacters = atob(base64);  // Decodificar el base64 a caracteres binarios
    const byteArrays = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, { type: mimeType });
}

async function crearCliente(cliente) {
    // Crea un objeto FormData y añade los datos del cliente
    const formData = new FormData();
    formData.append("NombreCliente", cliente.NombreCliente);
    formData.append("DireccionCliente", cliente.DireccionCliente);
    formData.append("NroDocumento", cliente.DocumentoCliente);
    formData.append("__RequestVerificationToken",document.querySelector('input[name="__RequestVerificationToken"]').value);
    formData.append("Pdf", cliente.Pdf);

    try {
        const response = await fetch('/Cliente/Create', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Cliente creado correctamente');
        } else {
            alert('Error al crear el cliente');
        }
    } catch (error) {
        console.error('Error al enviar la solicitud:', error);
        alert('Hubo un problema al crear el cliente');
    }
}

