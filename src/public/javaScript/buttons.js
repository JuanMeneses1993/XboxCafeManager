let activateTv = document.getElementById('activate-tv__form');
let clientRegistration = document.getElementById('client-registration__form');
let clientUpdate = document.getElementById('client-update__form');
let clientCheck = document.getElementById('client-check__form');


const hiddeAll = ()=>{
    console.log('dentro de hide all')
    activateTv.style.display = 'none';
    clientRegistration.style.display = 'none';
    clientUpdate.style.display = 'none';
    clientCheck.style.display = 'none';
    
}

const showActivateTv = ()=>{
    hiddeAll();
    activateTv.style.display = 'flex';
}

const showClientRegistration = ()=>{
    hiddeAll();
    clientRegistration.style.display = 'flex';
}

const showClientUpdate = ()=>{
    hiddeAll();
    clientUpdate.style.display = 'flex';
    
}

const showClientCheck = ()=>{
    hiddeAll();
    clientCheck.style.display = 'flex';
}

const showServerResponse = (serverResponse)=>{

}

hiddeAll();

//obtener todos los botones
const navButtonActivateTv = document.getElementById('nav__button--activate-tv');
const navButtonClientRegistration = document.getElementById('nav__button--client-registration');
const navButtonClientUpdate = document.getElementById('nav__button--client-update');
const navButtonClientCheck = document.getElementById('nav__button--client-check');

//agregar listeners
navButtonActivateTv.addEventListener('click', showActivateTv);
navButtonClientRegistration.addEventListener('click', showClientRegistration);
navButtonClientUpdate.addEventListener('click', showClientUpdate);
navButtonClientCheck.addEventListener('click', showClientCheck);


//**************************************************************** */ 


const getTvContainer = async ()=>{
    try {
        let tvContainer = document.querySelector('#tvs-container');
        const serverResponse = await fetch('/tv/', {method:'GET'});
    
        const serverResponseJson = await serverResponse.json();
   
        const responseData = serverResponseJson.map((tv) => {
            let currentTvContent = document.getElementById(`tv__content--${String(tv.tvNumber)}`)
            currentTvContent.innerHTML = `<div class='tv__number'>${tv.tvNumber}</div>
                                    <div class='tv__leftTime tv__leftTime--${tv.tvNumber}'>${tv.leftTime}</div>
                                `;
            
            let currentTv = document.getElementById(`tv--${String(tv.tvNumber)}`)



            if(tv.isActive === 'active' ){

                document.getElementById(`tv__close-icon--${tv.tvNumber}`)
                .style.display = 'grid';
                
                currentTv.classList.add('tv--active')
                currentTvContent.classList.remove(`tv--inactive`)

                //Desactivar las opciones de las maquinas que estan en uso
                let option = document.getElementById(`activate-tv__option--${tv.tvNumber}`);
                option.disabled = true;
            }



            
            if(tv.isActive === 'inactive'){
                document.getElementById(`tv__close-icon--${tv.tvNumber}`)
                .style.display = 'none';

                currentTv.classList.add('tv--inactive')

                currentTvContent.classList.remove(`tv--active`);
            }

            //agregar nueva clase si solo quedan 5 min
            if (tv.endTimeMinusFiveMin === 'completado'){
                currentTvContent.classList.add(`tv__leftTime--completado`);                  
            }

        })
        
    } catch (error) {
        
        throw new Error(error)
    }
}
const autoGetTvs = async ()=>{
    setTimeout(async ()=>{
        await getTvContainer()
        await autoGetTvs()
    }, 1000)
    
}

autoGetTvs()



