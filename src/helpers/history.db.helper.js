import { Connection } from "promise-mysql";
import { getConnection } from "../database/database";
import { tvDbHelper } from "./tv.db.helper"; 
import { timeHelper } from "./time.helper";

const createHistoryRow = async(tvNumber)=>{
    try {
        const { currentUser,
                state,
                minutesBrough,
                startTime,
                endTime,
                endTimeMinusFiveMin,
                employeeName} = await tvDbHelper.getTv(tvNumber);

        if (startTime === 'null') return;
        
        const timeActive = timeHelper.getTimeEnlapsed(startTime);
        const currentTime = timeHelper.formatDate(timeHelper.getCurrentDate());
        const timeActiveFormated = timeActive.slice(0, 6) + '00';
        const clientName = currentUser;

        //Escribir en la base de datos
        const connection = await getConnection();
        const historyRow = {'tvNumber' : tvNumber,
                            'mode' : state,
                            'timeActive' : timeActiveFormated,
                            'clientName' : clientName,
                            'employeeName' : employeeName ,
                            'date' : currentTime.slice(0, 10),
                            'time' : currentTime.slice(11)};

        await connection.query(`INSERT INTO historial SET ?`, historyRow);

    } catch (error) {
        console.log(error)
        throw new Error('Error al escribir historial')
    }

}

const getLast10Rows = async ()=>{

    const connection = await getConnection();
    const last10Rows = await connection.query(`SELECT * FROM historial ORDER BY id DESC LIMIT 10`);

    return last10Rows;
}

export const historyDbHelper = {
    createHistoryRow,
    getLast10Rows
}