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



            if(tv.state === 'active' ){

                document.getElementById(`tv__close-icon--${tv.tvNumber}`)
                .style.display = 'grid';
                
                currentTv.classList.add('tv--active')
                currentTvContent.classList.remove(`tv--inactive`)
                currentTvContent.classList.remove(`tv--unlimited`)

                //Desactivar las opciones de las maquinas que estan en uso
                let option = document.getElementById(`activate-tv__option--${tv.tvNumber}`);
                option.disabled = true;
            }
            if(tv.state === 'unlimited' ){

                document.getElementById(`tv__close-icon--${tv.tvNumber}`)
                .style.display = 'grid';
                
                currentTv.classList.add('tv--unlimited')
                currentTv.classList.remove(`tv--inactive`)
                currentTv.classList.remove(`tv--active`)

                //Desactivar las opciones de las maquinas que estan en uso
                let option = document.getElementById(`activate-tv__option--${tv.tvNumber}`);
                option.disabled = true;
            }


            if(tv.state === 'inactive'){
                document.getElementById(`tv__close-icon--${tv.tvNumber}`)
                .style.display = 'none';

                currentTv.classList.add('tv--inactive');

                currentTv.classList.remove(`tv--active`);
                currentTv.classList.remove(`tv--unlimited`);
                currentTvContent.classList.remove(`tv__leftTime--completado`);    
                
                //Activar las opciones de las maquinas que estan en uso
                let option = document.getElementById(`activate-tv__option--${tv.tvNumber}`);
                option.disabled = false;
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