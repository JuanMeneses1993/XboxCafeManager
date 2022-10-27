const showResponse = (serverResponse)=>{
    const responseElement = document.getElementById('server-responses')
    responseElement.textContent = `${serverResponse}`

    hiddeAll()

    //borrar despues de 2 segundos
    setTimeout(()=>{
        responseElement.innerHTML= '';

    }, 2000)
}

const sendActivateTvForm = async(event)=>{
    event.preventDefault()
    const {activateTvNumber, activateTvHours, activateTvMinutes, activateTvUser, activateTvPass} = event.target

    const serverResponse = await fetch('/tv/', {
        method:"POST",
        headers:{'Content-type' : 'application/json'},
        body:JSON.stringify({
            'activateTvNumber': activateTvNumber.value, 
            'activateTvHours':activateTvHours.value, 
            'activateTvMinutes':activateTvMinutes.value,
            'activateTvUser':activateTvUser.value,
            'activateTvPass':activateTvPass.value
        })
    })

    const responseText = await serverResponse.text()

    if (responseText === 'Equipo activado con exito'){
        //borrar formulario
        activateTvNumber.value = '0';
        activateTvHours.value = '0'; 
        activateTvMinutes.value = '00';
        activateTvUser.value = 'none';
        activateTvPass.value = 'none';
    }

    showResponse(responseText)
}
const sendClientCheckForm = async(event)=>{
    event.preventDefault()
    const {clientCheckUser, serverResponse2 } = event.target

    const userName = clientCheckUser.value

    const serverResponse = await fetch(`/client/${userName}`, {
        method:"GET",
        headers:{'Content-type' : 'application/json'},
    })

    const responseText = await serverResponse.text()
    serverResponse2.textContent = `Holis: ${responseText}`

    //borrar formulario
    clientCheckUser.value = '';

    showResponse(responseText)
}


document.getElementById('activate-tv__form')
.addEventListener('submit', sendActivateTvForm);

document.getElementById('client-check__form')
.addEventListener('submit', sendClientCheckForm);
