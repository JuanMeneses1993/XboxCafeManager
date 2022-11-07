const showResponse = (serverResponse)=>{
    const responseElement = document.getElementById('server-responses');
    responseElement.textContent = `${serverResponse}`;

    hiddeAll();

    //borrar despues de 10 segundos
    setTimeout(()=>{
        responseElement.innerHTML= '';

    }, 10000);
};

const sendNewEmployeeForm = async(event)=>{
    event.preventDefault();
    const {user, pass, passRepeat} = event.target;

    const serverResponse = await fetch('/users/', {
        method:"POST",
        headers:{'Content-type' : 'application/json'},
        body:JSON.stringify({
            'user': user.value, 
            'pass': pass.value, 
            'passRepeat': passRepeat.value,
        })
    });

    const responseText = await serverResponse.text();


    if (serverResponse.status === 200){
        //resetear formulario
        event.target.reset();
    };

    showResponse(responseText);
};

document.getElementById('new-employee__form')
.addEventListener('submit', sendNewEmployeeForm);

