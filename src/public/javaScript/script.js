
const invertButton = (button)=>{

    let isUser = document.getElementById("selector-si")
    let isNotUser = document.getElementById("selector-no")
    const input_user = document.getElementById('form-user');
    const input_pass = document.getElementById('form-pass');
    const checkbox = document.getElementById('no-registred-chbx')

    

    if (button === 'isUser'){
        //ativar el boton
        isUser.style.backgroundColor = 'var(--selector-active-color)';
        //desactivar el otro boton
        isNotUser.style.backgroundColor = 'var(--selector-inactive-color)';
        //mostrar usuario y pass
        input_user.style.visibility= "visible";
        input_pass.style.visibility= "visible";


        //cambiar valores de user y pass para procesarlo en el servidor
        input_user.value='';
        input_pass.value= '';
    }
    else{
        //ativar el boton
        isNotUser.style.backgroundColor = 'var(--selector-active-color)';
        //desactivar el otro boton
        isUser.style.backgroundColor = 'var(--selector-inactive-color)';
       
        //ocultar usuario y pass
        input_user.style.visibility= "hidden";
        input_pass.style.visibility= "hidden";

        //cambiar valores de user y pass para procesarlo en el servidor
        input_user.value='none';
        input_pass.value= 'none';

    }
} 


