const showResponse = (serverResponse)=>{
    const responseElement = document.getElementById('server-responses')
    responseElement.textContent = `${serverResponse}`

    hiddeAll()

    //borrar despues de 2 segundos
    setTimeout(()=>{
        responseElement.innerHTML= '';

    }, 10000)
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
    const {clientCheckUser} = event.target

    const userName = clientCheckUser.value

    const serverResponse = await fetch(`/client/${userName}`, {
        method:"GET",
        headers:{'Content-type' : 'application/json'},
    })

    const responseText = await serverResponse.text()

    //borrar formulario
    clientCheckUser.value = '';

    showResponse(`Usuario ${userName} ${responseText}`)
}

const sendClientRegistrationForm = async (event)=>{
    event.preventDefault()
    const {clientRegistrationUser, clientRegistrationPass, clientRegistrationPassRepeat} = event.target

    const serverResponse = await fetch('/client/', {
        method:"POST",
        headers:{'Content-type' : 'application/json'},
        body:JSON.stringify({
            'clientRegistrationUser': clientRegistrationUser.value, 
            'clientRegistrationPass':clientRegistrationPass.value, 
            'clientRegistrationPassRepeat':clientRegistrationPassRepeat.value,
        })
    })

    const responseText = await serverResponse.text()

    if (responseText === 'Usuario creado satisfactoriamente'){
        //borrar formulario
        clientRegistrationUser.value = '';
        clientRegistrationPass.value = ''; 
        clientRegistrationPassRepeat.value = '';
    }

    showResponse(responseText)
}

const sendClientUpdateForm = async (event)=>{
    event.preventDefault()
    const {clientUpdateUser, clientUpdateHours} = event.target

    const serverResponse = await fetch('/client/', {
        method:"PATCH",
        headers:{'Content-type' : 'application/json'},
        body:JSON.stringify({
            'clientUpdateUser': clientUpdateUser.value, 
            'clientUpdateHours': clientUpdateHours.value, 
        })
    })

    const responseText = await serverResponse.text()

    if (responseText === 'Tiempo agregado satisfactoriamente'){
        //borrar formulario
        clientUpdateUser.value = '';
        clientUpdateHours.value = '00'; 
    }

    showResponse(responseText)
}

document.getElementById('activate-tv__form')
.addEventListener('submit', sendActivateTvForm);

document.getElementById('client-check__form')
.addEventListener('submit', sendClientCheckForm);

document.getElementById('client-registration__form')
.addEventListener('submit', sendClientRegistrationForm);

document.getElementById('client-update__form')
.addEventListener('submit', sendClientUpdateForm);
