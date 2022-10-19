const getTvContainer = async ()=>{
    try {
        let tvContainer = document.querySelector('#tvs-container');
        const serverResponse = await fetch('/tv/', {method:'GET'});
    
        const serverResponseJson = await serverResponse.json();
        console.log(serverResponseJson)
   
        const responseData = serverResponseJson.map((tv) => {
            let currentTv = document.getElementById(`tv__content--${String(tv.tvNumber)}`)
            currentTv.innerHTML = `<div class='tv__number'>${tv.tvNumber}</div>
                                    <div class='tv__leftTime'>${tv.leftTime}</div>
                                `;
            currentTv.classList.add(`tv__${tv.isActive}`)
            document.getElementById(`tv__close-icon--${tv.tvNumber}`)
            .classList
            .add(`tv__close-icon--${tv.isActive}`);

            if(tv.isActive === 'active'){
                let option = document.getElementById(`activate-tv__option--${tv.tvNumber}`);
                option.disabled = true;
            }

        })
        
    } catch (error) {
        console.log('error en La solicitur')
        console.log(error)
    }
}
const autoGetTvs = ()=>{
    getTvContainer()
    setTimeout(autoGetTvs, 1000)
}

autoGetTvs()