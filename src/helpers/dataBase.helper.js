import { Connection } from "promise-mysql";
import { getConnection } from "../database/database";
import {timeHelper} from "./../helpers/time.helper";
import { tvHelper } from "./tv.helper";


const updateTimeEnd = async ()=>{
    //revisa todos los valores de EndTime y de endTimeAfterFive 
    //y si alguno es mayor que la fecha actual
    //actualiza a isActive en inactive y pone el endTime en Null
    try {
        const connection = await getConnection();
        const dbResponse= await connection.query("SELECT tvNumber, currentUser, isActive, minutesBrough, startTime, endTime, endTimeMinusFiveMin FROM tvs")
        
        dbResponse.forEach(async (tv) => {
            if (tv.endTime !== 'null' ){
                const leftTime = timeHelper.getTimeLeft(tv.endTime);
                const endTimeMinusFiveMin = timeHelper.getTimeLeft(tv.endTimeMinusFiveMin);

                if (endTimeMinusFiveMin === '00:00:00' && tv.endTimeMinusFiveMin !== 'completado'){
                    //Actualizar los 5 min a completado
                    await setTimeEndMinusFiveInComplete(tv.tvNumber)
                    // mostrar el anuncio de los 5 min
                    tvHelper.showFiveMinAd(tv.tvNumber)
                };
                
                if (leftTime === '00:00:00'){
                    //poner en blanco todos los campos de esa tv
                    await resetTimeEnd(tv.tvNumber);
                    //apagar la tv
                    tvHelper.deactivateTv(tv.tvNumber)
                };
            };   
        });
        
    } catch (error) {
        console.log(error)
        return error;
    };
};

const resetTimeEnd = async (tvNumber)=>{

    //REDUNDANTE UTILIZAR DEACTIVATV
    //Resetea a null el endTime y pone en inactive el numero de tvNumber que le pasemos
    try {
        const tv = {'tvNumber': tvNumber, 'isActive':'inactive', 'endTime':'null', 'startTime':'null', 'minutesBrough': 0, 'currentUser': 'noUserDueTvInactivity', 'endTimeMinusFiveMin': 'null'}
        const connection = await getConnection();
        const result = await connection.query("UPDATE tvs SET ? WHERE tvNumber = ?", [tv, tvNumber]);
    } catch (error) {
        console.log(error)
        return error;
    };
};

const setTimeEndMinusFiveInComplete = async (tvNumber)=>{
    //Resetea a null el endTime y pone en inactive el numero de tvNumber que le pasemos
    try {
        const tv = {'endTimeMinusFiveMin' : 'completado'}
        const connection = await getConnection();
        const result = await connection.query("UPDATE tvs SET ? WHERE tvNumber = ?", [tv, tvNumber]);
        return 'aaaa'
    } catch (error) {
        return error;
    };
};

const consultTvNumber = async (tvNumber_form)=> {
    //Devuelve un error si el equipo esta en uso
    try {
        const connection = await getConnection();
        const respuestaDB = await connection.query(`SELECT isActive FROM tvs WHERE tvNumber = ${tvNumber_form}`)
            .then(DBResponse =>{
                if (DBResponse[0].isActive === 'active'){
                    throw new Error('El equipo esta en uso');
                };
            });
            
    } catch (error) {
        throw new Error(error);
    }

};

const getTvInfo= async (req, res)=>{
//Devuelve todos las propiedades actuales de Todos los TVs
    
    try {
        //consulta a la base de datos
        const connection = await getConnection();
        const dbResponse = await connection.query("SELECT tvNumber, currentUser, isActive, minutesBrough, startTime, endTime, endTimeMinusFiveMin FROM tvs");
    
        const response = dbResponse.map((element, index) => {
            
            const endTime = dbResponse[index].endTime;

            let leftTime ='';
            if (dbResponse[index].endTime === 'null'){
                //result[index].endTime = '00:00:00';
                leftTime = "-- : -- : --";
            }
            else{
                leftTime = timeHelper.getTimeLeft(dbResponse[index].endTime);
            };

            //extraer datos
            const {isActive, tvNumber, endTimeMinusFiveMin} = dbResponse[index];

            //devolver datos
            return {tvNumber, isActive, leftTime, endTimeMinusFiveMin};
        });
        //Devuelve todos los tvs en un array
        return response;
        
    } catch (error) {
        return error;
    };

};

const updateTv = async (tvNumber, minutesBrough, user)=>{
    try {
        const startTime = timeHelper.formatDate(timeHelper.getCurrentDate());
        const endTime = timeHelper.getEndTime(minutesBrough);
        const endTimeMinusFiveMin = timeHelper.getEndTime(minutesBrough - 5);
        const isActive = 'active';
        const currentUser = user;

        const tv = { startTime, endTime, isActive, currentUser, minutesBrough, endTimeMinusFiveMin };
        const connection = await getConnection();
        const result = await connection.query("UPDATE tvs SET ? WHERE tvNumber = ?", [tv, tvNumber]);
        
    } catch (error) {
        console.log(error);
    };
};

const deactivateTv = async (tvNumber)=>{
    //resetea todos los campos de la tv que se le pase como parametro
    try {
        const tv = { 'startTime': 'null', 'endTime': 'null', 'isActive': 'inactive', 'currentUser': 'noUserDueInactivity', 'minutesBrough': '0', 'endTimeMinusFiveMin': 'null'};
        const connection = await getConnection();
        const result = await connection.query("UPDATE tvs SET ? WHERE tvNumber = ?", [tv, tvNumber]);
        
    } catch (error) {
        throw new Error(error)
    }
}

export const tvDbHelper = {
    updateTimeEnd,
    getTvInfo,
    consultTvNumber,
    updateTv,
    deactivateTv
}

