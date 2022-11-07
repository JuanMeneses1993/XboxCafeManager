let newEmployee = document.getElementById('new-employee__form');
let employees = document.getElementById('employees');
let deleteEmployee = document.getElementById('delete-employee__form');
let statistics = document.getElementById('statistics');


const hiddeAll = ()=>{
    activateTv.style.display = 'none';
    clientRegistration.style.display = 'none';
    clientUpdate.style.display = 'none';
    clientCheck.style.display = 'none';
    history.style.display = 'none';
    newEmployee
    employees
    deleteEmployee
    statistics

}

const showElement = (element)=>{
    hiddeAll();
    form.style.display = 'flex';
}



hiddeAll();

//obtener todos los botones
const navButtonActivateTv = document.getElementById('nav__button--activate-tv');


//agregar listeners
navButtonActivateTv.addEventListener('click', showActivateTv);
