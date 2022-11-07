import { Connection } from "promise-mysql";
import { getConnection } from "../database/database";
import {timeHelper} from "./time.helper";
import { tvHelper } from "./tv.helper";
import { historyDbHelper } from "./history.db.helper";
import { clientDbHelper } from "./client.db.helper";


const dbChecker = async ()=>{

    try {
        const totalRows = await countTvRows();
        
        let index = 1;
        while (index <= totalRows){
            const tv = await getTv(index);

            if (tv.state === 'inactive'){
                index++;
                continue;
            };

            const timeLeft = timeHelper.getTimeLeft(tv.endTime);
            const timeLeftMinusFiveMin = timeHelper.getTimeLeft(tv.endTimeMinusFiveMin);

            //Verificar si el tiempo ya esta vencido
            if (timeLeft === 'completado'){
                await historyDbHelper.createHistoryRow(tv.tvNumber);
                await tvDbHelper.resetTvDb(tv.tvNumber);
                tvHelper.deactivateTv(tv.tvNumber);
                return;
            }

            //Verificar si tiene que mostrar el anuncio de 5 min
            else if (timeLeftMinusFiveMin === 'completado' && tv.endTimeMinusFiveMin !== 'completado'){
                await setTimeEndMinusFiveInComplete(tv.tvNumber);
                tvHelper.showFiveMinAd(tv.tvNumber);
                return;
            };

            index++;
        }
        

    } catch (error) {
        console.log(error)
        throw new Error ('Error en el autoChecker de la base de datos')
    };
};

const setTimeEndMinusFiveInComplete = async (tvNumber)=>{
    //Resetea a null el endTime y pone en inactive el numero de tvNumber que le pasemos
    try {
        const tv = {'endTimeMinusFiveMin' : 'completado'}
        const connection = await getConnection();
        const result = await connection.query("UPDATE tvs SET ? WHERE tvNumber = ?", [tv, tvNumber]);

    } catch (error) {
        return error;
    };
};

const isTvActive = async (tvNumber_form)=> {
    //Devuelve un error si el equipo esta en uso
    try {
        const connection = await getConnection();
        const respuestaDB = await connection.query(`SELECT state FROM tvs WHERE tvNumber = ${tvNumber_form}`)
            .then(DBResponse =>{
                if (DBResponse[0].state === 'active'){
                    throw new Error('El equipo esta en uso');
                };
            });
            
    } catch (error) {
        throw new Error(error);
    }

};

const getTvsInfo= async ()=>{
//Devuelve todos las propiedades actuales de Todos los TVs
    
    try {
        //consulta a la base de datos
        const connection = await getConnection();
        const dbResponse = await connection.query("SELECT tvNumber, currentUser, state, minutesBrough, startTime, endTime, endTimeMinusFiveMin FROM tvs");
    
        const response = dbResponse.map((element, index) => {
            
            const endTime = dbResponse[index].endTime;

            const time = ()=>{

                if (dbResponse[index].state === 'unlimited'){
                    return timeHelper.getTimeEnlapsed(dbResponse[index].startTime);
                }
    
                else if (dbResponse[index].endTime === 'null'){
                    return "-- : -- : --";
                }
                else{
                    return timeHelper.getTimeLeft(dbResponse[index].endTime);
                };
            };
            let leftTime = time();

            //extraer datos
            const {state, tvNumber, endTimeMinusFiveMin} = dbResponse[index];

            //devolver datos
            return {tvNumber, state, leftTime, endTimeMinusFiveMin};
        });
        //Devuelve todos los tvs en un array
        return response;
        
    } catch (error) {
        return error;
    };

};

const getTv= async (tvNumber)=>{
    
    try {
        //consulta a la base de datos
        const connection = await getConnection();
        const dbResponse = await connection.query(`SELECT tvNumber, currentUser, state, minutesBrough, startTime, endTime, endTimeMinusFiveMin, employeeName FROM tvs WHERE tvNumber = ${tvNumber}`);
        
        return dbResponse[0]
        
    } catch (error) {
        return error;
    };

};

const writeTvDb = async (tvNumber, minutesBrough, user, state, employeeName)=>{
    
    try {

        const startTime = timeHelper.formatDate(timeHelper.getCurrentDate());

        const endTime = timeHelper.calculateEndingTime(Number(minutesBrough));
        const endTimeMinusFiveMin = timeHelper.calculateEndingTime(Number(minutesBrough) - 5);

        const currentUser = user;

        const tv = { startTime, endTime, state, currentUser, minutesBrough, endTimeMinusFiveMin, employeeName};
        const connection = await getConnection();
        const result = await connection.query("UPDATE tvs SET ? WHERE tvNumber = ?", [tv, tvNumber]);
        
    } catch (error) {
        console.log(error)
        throw new Error('Error escribiendo base de datos')
    };
};

const resetTvDb = async (tvNumber)=>{
    //resetea todos los campos de la tv que se le pase como parametro

    try {

        const {state, currentUser, startTime} = await getTv(tvNumber);

        //En caso de estar en modo unlimited restar al usuario el tiempo
        if (state === 'unlimited'){
            const enlapsedTime = timeHelper.getTimeEnlapsed(startTime);
            console.log("enlapsedTime: ", enlapsedTime)
            const minutes = timeHelper.timerToMinutes(enlapsedTime);
            console.log('minutes: ', minutes)
            await clientDbHelper.substractMinutesToClient(currentUser, minutes, ' ');
        }

        const tv = { 'startTime': 'null', 'endTime': 'null', 'state': 'inactive', 'currentUser': 'noUserDueTvInactivity', 'minutesBrough': '0', 'endTimeMinusFiveMin': 'null', 'currentUser': 'null'};
        const connection = await getConnection();
        const result = await connection.query("UPDATE tvs SET ? WHERE tvNumber = ?", [tv, tvNumber]);

    } catch (error) {
        throw new Error('Error reseteando la base de datos tvs')
    }
};

const countTvRows = async ()=>{
    const connection = await getConnection();
    const totalRowsDb = await connection.query('SELECT COUNT(*) FROM tvs');
    const totalRows = totalRowsDb[0]['COUNT(*)'];
    return totalRows;
};

export const tvDbHelper = {
    dbChecker,
    getTvsInfo,
    getTv,
    isTvActive,
    writeTvDb,
    resetTvDb
}

