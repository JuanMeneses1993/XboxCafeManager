// obtener datos del formulario
const botonActivate = document.querySelector('#activate-tv__button')

botonActivate.addEventListener('click', ()=>{
    const tvNumber = document.querySelector('#form-tvNumber').value
    const tvHours = document.querySelector('#form-hours').value
    const tvMinutes = document.querySelector('#form-minutes').value
    const tvUser = document.querySelector('#form-user').value
    const tvPass = document.querySelector('#form-pass').value

    const formData =  {tvNumber, tvHours, tvMinutes, tvUser, tvPass}
    sendForm(formData)
});

//validar campos
//hacer solicitud
const sendForm = async (formData)=>{
    console.log('dentro de send Form')
    try {
        const serverResponse = await fetch('/tv/', {
            method:"POST",
            headers:{'Content-type' : 'application/json'},
            body:JSON.stringify(formData)
        })
        const responseText = await serverResponse.text()
        console.log(responseText)
        showResponseInHmtl(responseText)
        
    } catch (error) {
        console.log(error)
        
    }
}

const showResponseInHmtl= (res)=>{
    //Muestra la respuesta enviada por el servidor al hacer la solicitud
    
    //Obtener el elemento
    const serverResponses = document.getElementById('server-responses')
    serverResponses.innerHTML = `<h4 class="server-responses-title" >${res}</h4>`

};