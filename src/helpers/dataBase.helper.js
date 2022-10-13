import { Connection } from "promise-mysql";
import { getConnection } from "../database/database";
import {timeHelper} from "./../helpers/time.helper";


const updateTimeEnd = async ()=>{
    //revisa todos los valores de EndTime 
    //y si alguno es mayor que la fecha actual
    //actualiza a isActive en inactive y pone el endTime en Null
    try {
        const connection = await getConnection();
        const dbResponse= await connection.query("SELECT tvNumber, currentUser, isActive, minutesBrough, startTime, endTime FROM tvs")
            .then((dbRes)=>{
                dbRes.forEach((tv, index) => {
                    if (tv.endTime !== 'null' ){
                        const leftTime = timeHelper.getTimeLeft(tv.endTime);
                        if (leftTime === '00:00:00'){
                            resetTimeEnd(tv.tvNumber);
                        };
                    };   
                });
            });
        
    } catch (error) {
        return error;
    };
};

const resetTimeEnd = async (tvNumber)=>{
    //Resetea a null el endTime y pone en inactive el numero de tvNumber que le pasemos
    try {
        const tv = {'tvNumber': tvNumber, 'isActive':'inactive', 'endTime':'null', 'startTime':'null', 'minutesBrough': 0, 'currentUser': 'noUserDueTvInactivity'}
        const connection = await getConnection();
        const result = await connection.query("UPDATE tvs SET ? WHERE tvNumber = ?", [tv, tvNumber]);
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
        return error;
    }

};

const consultUserLeftMinutes = async (minutesLeft, user_form)=>{
    //Revisa en la base de datos el tiempo que le queda al usuario
    //si el tiempo solicitado es mayor al disponible devuelve un error

    try {
        //Si el usuario es anonimo sale de la funcion
        if (user_form === 'Anonimous User'){
            return;
        };

        //consulta la base de datos
        const connection = await getConnection();
        const leftMinutesDB = await connection.query("SELECT leftMinutes FROM clientes WHERE user = ?", user_form)
            .then(DBResponse =>{
                //comparar si tiene tiempo suficiente
                if ( Number(Number(DBResponse[0].leftMinutes)) < leftMinutesForm) {
                    throw new Error('Usuario no posee tiempo suficiente.');
                };
            });
        
    } catch (error) {
        return error;
    }
};

const consultUserPass = async(user, pass)=>{
    //devuelve el ok si el user y el pass son correctos
    try {
        //verificar la maquina sera activada sin usuario
        if (user === 'none' || pass === 'none'){     
            return 'Anonimous User';
        };
        
        //formatear usuario(en minusculas y sin espacios ni saltos de linea)
        const userFormated = user.replace(/\s+/g, '').toLowerCase();
        
        //consulta a la base de datos
        const connection = await getConnection();
        const userResponse = await connection.query("SELECT user, pass FROM clientes WHERE user = ?", userFormated)
            .then(DBResponse=>{
                //verifica si la clave coincide
                if (DBResponse[0].pass === pass){
                    return userFormated;
                }
                else{throw new Error('Invalid User Pass')};
            
            })
    
        return userResponse
        
    } catch (error) {
        return error
    }
    

};

const getTvInfo= async (req, res)=>{
//Devuelve todos las propiedades actuales de Todos los TVs
    
    try {
        //consulta a la base de datos
        const connection = await getConnection();
        const dbResponse = await connection.query("SELECT tvNumber, currentUser, isActive, minutesBrough, startTime, endTime FROM tvs");
    
        const response = dbResponse.map((element, index) => {
            
            const endTime = dbResponse[index].endTime;

            let leftTime ='';
            if (dbResponse[index].endTime === 'null'){
                //result[index].endTime = '00:00:00';
                leftTime = "00:00:00";
            }
            else{
                leftTime = timeHelper.getTimeLeft(dbResponse[index].endTime);
            };

            //extraer datos
            const {isActive, tvNumber} = dbResponse[index];

            //devolver datos
            return {tvNumber, isActive, leftTime};
        });
        //Devuelve todos los tvs en un array
        return response;
        
    } catch (error) {
        return error;
    };

};

const updateClientMinutesLeft = async (user, minutesLeft)=>{
    try {
        //consulta a la base de datos
        const connection = await getConnection();
        const leftMinutesUpdated = await connection.query(`SELECT leftMinutes FROM clientes WHERE user = ?`, user)
            .then(DBResponse=>{

                return((Number(DBResponse[0].leftMinutes)) - (Number(minutesLeft)));
            });

        //actualizar los datos
        const result = await connection.query(`UPDATE clientes SET leftMinutes = ${leftMinutesUpdated} WHERE user = ?`,user);

    } catch (error) {
        return error;
    }
};

const updateTv = async (tvNumber, minutesBrough, user)=>{
    try {
        const startTime = timeHelper.formatDate(timeHelper.getCurrentDate());
        const endTime = timeHelper.getEndTime(minutesBrough);
        const isActive = 'active';
        const currentUser = user;

        const tv = { startTime, endTime, isActive, currentUser, minutesBrough };
        const connection = await getConnection();
        const result = await connection.query("UPDATE tvs SET ? WHERE tvNumber = ?", [tv, tvNumber]);
        
    } catch (error) {
        console.log(error);
    };
};

export const dataBaseHelper = {
    updateTimeEnd,
    consultUserPass,
    getTvInfo,
    consultUserLeftMinutes,
    consultTvNumber,
    updateClientMinutesLeft,
    updateTv
}

