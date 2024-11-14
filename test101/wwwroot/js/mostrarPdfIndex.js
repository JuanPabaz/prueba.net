function mostrarPdf(pdfUrl) {
    debugger;
    const pdfModal = document.getElementById("pdfModal");
    const pdfEmbed = document.getElementById("pdfEmbed");

    pdfEmbed.src = pdfUrl; // Establece el URL del PDF en el embed
    pdfModal.classList.remove("hidden"); // Muestra el modal
}

function cerrarModal() {
    const pdfModal = document.getElementById("pdfModal");
    const pdfEmbed = document.getElementById("pdfEmbed");

    pdfEmbed.src = ""; // Limpia el URL cuando se cierra el modal
    pdfModal.classList.add("hidden"); // Oculta el modal
}
