// obtener datos del formulario
const botonActivate = document.querySelector('#button-activate')

botonActivate.addEventListener('click', ()=>{
    const tvNumber = document.querySelector('#form-tvNumber').value
    const tvHours = document.querySelector('#form-hours').value
    const tvMinutes = document.querySelector('#form-minutes').value
    const tvUser = document.querySelector('#form-user').value
    const tvPass = document.querySelector('#form-pass').value

//validar campos
//hacer solicitud
    fetch('/tv/', {
    method:"POST",
    headers:{'Content-type' : 'application/json'},
    body:JSON.stringify({tvNumber_form: tvNumber, tvHours_form:tvHours, tvMinutes_form:tvMinutes, user_form:tvUser, pass_form:tvPass})
    })

    .then((res)=>{
        console.log('hola')
        console.log(JSON.stringify({tvNumber_form: tvNumber, tvHours_form:tvHours, tvMinutes_form:tvMinutes, user_form:tvUser, pass_form:tvPass}))
        alert(JSON.stringify({tvNumber_form: tvNumber, tvHours_form:tvHours, tvMinutes_form:tvMinutes, user_form:tvUser, pass_form:tvPass}))
        
        return showResponseInHmtl(res.body)
    })
    .catch((err)=>console.log(err))

});

const showResponseInHmtl= (res)=>{
    //Muestra la respuesta enviada por el servidor al hacer la solicitud
    
    //Obtener el elemento
    const serverResponses = document.getElementById('server-responses')
    serverResponses.innerHTML = `<h4 class="server-responses-title" >${res}</h4>`
    return
}