const getTvContainer = ()=>{
    let tvContainer = document.querySelector('#tvs-container')
    fetch('/tv/', {method:'GET'})
    .then((res)=>{
        
        return res.json()
    })
    .then(data =>{
        let html = ''
        data.map((tv, index) => {
            
            html = html + `
                <div class='tv tv--${tv.isActive}'>
                    <div class='tv__number'>${tv.tvNumber}</div>
                    <div class='tv__leftTime'><h3 class='left-time__texto'>${tv.leftTime}</h3></div>
                    <div class='tv__close${tv.isActive}'></div>
                </div>`
        });
        return html
    })
    .then((html)=>{
        tvContainer.innerHTML = html;
        setTimeout(getTvContainer(), 1000)
    })
    
}

getTvContainer()
