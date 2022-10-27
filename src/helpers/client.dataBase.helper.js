import { Connection } from "promise-mysql";
import { getConnection } from "../database/database";

const isUserExist = async (userName)=>{
    //devuelve un error si el usuario ya esta registrado

    try {
        const connection = await getConnection();
        const dbResponse= await connection.query("SELECT user FROM clientes WHERE user = ?", userName)
        

        if (Object.values(dbResponse).length > 0){
            throw new Error('El usuario ya existe')
        }

    } catch (error) {
        throw new Error(error)
    }
}

const createNewClient = async (user, pass)=>{
    try {
        const leftMinutes = '0'
        const client = {user, pass, leftMinutes};
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO clientes SET ?", client);
        
    } catch (error) {
        throw new Error('Error al agregar cliente')
    }

}

const getClientLeftMinutes = async (userName)=>{
    try {
        const connection = await getConnection();
        const dbResponse= await connection.query("SELECT leftMinutes FROM clientes WHERE user = ?", userName)

        return dbResponse[0]['leftMinutes']
        
    } catch (error) {
        throw new Error(error)
    }

}

const addMinutesToClient = async (userName, hours, minutes)=>{
    try {
        //obtener los minutos actuales de ese usuario
        const dataBaseLeftMinutes = await clientDbHelper.getClientLeftMinutes(userName)

        //convertir a minutos
        const totalMinutes = (Number(hours) * 60) + Number(minutes)
        
        //sumar con los minutos de la base de datos
        const leftMinutesUpdated =  Number(dataBaseLeftMinutes) + totalMinutes;
        
        //Actualizar la base de datos
        const connection = await getConnection();
        const result = await connection.query(`UPDATE clientes SET leftMinutes = ${leftMinutesUpdated} WHERE user = ?`,userName);
        
    } catch (error) {
        throw new Error ('Usuario no valido')
    }
}

const updateClientMinutesLeft = async (user, minutesLeft)=>{
    try {

        if (user === 'Anonimous User'){
            return
        }
        
        //consulta a la base de datos
        const connection = await getConnection();
        const leftMinutesUpdated = await connection.query(`SELECT leftMinutes FROM clientes WHERE user = ?`, user)
            .then(DBResponse=>{
                return((Number(DBResponse[0].leftMinutes)) - (Number(minutesLeft)));
            });

        //actualizar los datos
        const result = await connection.query(`UPDATE clientes SET leftMinutes = ${leftMinutesUpdated} WHERE user = ?`,user);

    } catch (error) {
        throw new Error(error)
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
        
        //comparar si tiene tiempo suficiente
        if ( Number(Number(leftMinutesDB[0].leftMinutes)) < minutesLeft) {
            throw new Error('Usuario no posee tiempo suficiente.');
        };
        
    } catch(error){
        throw new Error (error)
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
                else{
                    throw new Error('Invalid User Pass')
                };
            })
    
        return userResponse
        
    } catch (error) {
        throw new Error(error)
    }
    

};


export const clientDbHelper ={
    isUserExist,
    createNewClient,
    getClientLeftMinutes,
    addMinutesToClient,
    updateClientMinutesLeft,
    consultUserLeftMinutes,
    consultUserPass

}