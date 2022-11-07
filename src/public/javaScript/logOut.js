const logOut = async ()=>{
    try {
        await fetch(`/login`, {method:'DELETE'})
        window.location.replace("/")
    } catch (error) {
        console.log(error)
    };
};

document.getElementById('nav__button--log-out')
.addEventListener('click', logOut);