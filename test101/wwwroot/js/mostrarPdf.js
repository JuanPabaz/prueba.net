async function mostrarPdf() {
    debugger;
    const formData = new FormData(document.getElementById("formPrincipal"));
    const nombreCliente = formData.get("NombreCliente");
    const DireccionCliente = formData.get("DireccionCliente");
    const DocumentoCliente = "123456789";
    const request = {
        NombreCliente: nombreCliente,
        DireccionCliente: DireccionCliente,
        DocumentoCliente: DocumentoCliente
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
