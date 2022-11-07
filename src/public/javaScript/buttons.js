let activateTv = document.getElementById('activate-tv__form');
let clientRegistration = document.getElementById('client-registration__form');
let clientUpdate = document.getElementById('client-update__form');
let clientCheck = document.getElementById('client-check__form');
let history = document.getElementById('history');


const hiddeAll = ()=>{
    activateTv.style.display = 'none';
    clientRegistration.style.display = 'none';
    clientUpdate.style.display = 'none';
    clientCheck.style.display = 'none';
    history.style.display = 'none';
}

const showHistory = async()=>{
    hiddeAll();
    history.style.display = 'flex';
    await getHistory()
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
const navButtonHistory = document.getElementById('nav__button--history');

//agregar listeners
navButtonActivateTv.addEventListener('click', showActivateTv);
navButtonClientRegistration.addEventListener('click', showClientRegistration);
navButtonClientUpdate.addEventListener('click', showClientUpdate);
navButtonClientCheck.addEventListener('click', showClientCheck);
navButtonHistory.addEventListener('click', showHistory);


//**************************************************************** */ 





