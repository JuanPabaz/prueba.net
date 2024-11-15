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


