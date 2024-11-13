export async function crearCliente(cliente){
    const response = await fetch('/Cliente/Create',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    }) 

    if(response.ok){
        alert('Cliente creado correctamente');
    }else{
        alert('Error al crear el cliente');
    }
}