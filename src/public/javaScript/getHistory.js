const getHistory = async ()=>{
    let table = document.querySelector('#history');
    const serverResponse = await fetch('/history/', {method:'GET'});
    const historyJson = await serverResponse.json();

    table.innerHTML = `
                        <thead><h2 class="table__title">Historial</h2></thead>
                        <tr class ="table__row table__row--head">
                            <td class = " table__head table__head--tvNumber"> Nº </td>
                            <td class = " table__head table__head--user">Usuario</td>
                            <td class = " table__head table__head--user">Empleado</td>
                            <td class = " table__head table__head--timeActive">Tiempo</td>
                            <td class = " table__head table__head--date">Fecha</td>
                            <td class = " table__head table__head--time">Hora</td>
                        </tr>`
    historyJson.forEach((historyRow, index) => {
        
        let evenOrOdd = 'odd';
        if (index%2 === 0){
            evenOrOdd = 'even';
        };
        table.innerHTML += `
            <tr class = "table__row table__row--${evenOrOdd}">
                <td class = "table__data table__data--tvNumber">${historyRow.tvNumber}</td>
                <td class = "table__data table__data--user">${historyRow.clientName}</td>
                <td class = "table__data table__data--employee">${historyRow.employeeName}</td>
                <td class = "table__data table__data--timeActive">${historyRow.timeActive}</td>
                <td class = "table__data table__data--date">${historyRow.date}</td>
                <td class = "table__data table__data--time">${historyRow.time.slice(0, -6)}</td>
            </tr>`
    });
};