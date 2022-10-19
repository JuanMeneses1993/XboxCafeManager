
let addTv = document.getElementById('add-tv');
let clientRegistration = document.getElementById('client-registration');
let clientUpdate = document.getElementById('client-update');
let clientCheck = document.getElementById('client-check');

const hiddeAll = ()=>{
    addTv.style.display = 'none';
    clientRegistration.style.display = 'none';
    clientUpdate.style.display = 'none';
    clientCheck.style.display = 'none';
}

const showAddTv = ()=>{
    hiddeAll();
    addTv.style.display = 'grid';
}

const showClientRegistration = ()=>{
    hiddeAll();
    clientRegistration.style.display = 'grid';
}

const showClientUpdate = ()=>{
    hiddeAll();
    clientUpdate.style.display = 'grid';
}

const showClientCheck = ()=>{
    hiddeAll();
    clientCheck.style.display = 'grid';
}

//obtener todos los botones
const navButtonActivateTv = document.getElementById('nav__button--activate-tv');
const navButtonClientRegistration = document.getElementById('nav__button--client-registration');
const navButtonClientUpdate = document.getElementById('nav__button--client-update');
const navButtonClientCheck = document.getElementById('nav__button--client-check');

//agregar listeners
navButtonActivateTv.addEventListener('click', showAddTv)
navButtonClientRegistration.addEventListener('click', showClientRegistration)
navButtonClientUpdate.addEventListener('click', showClientUpdate)
navButtonClientCheck.addEventListener('click', showClientCheck)