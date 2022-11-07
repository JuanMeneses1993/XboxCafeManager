import { Connection } from "promise-mysql";
import { getConnection } from "../database/database";

const getUserRole = async (user)=>{
    //devuelve un error si el usuario ya esta registrado
    
    try {
        const connection = await getConnection();
        const dbResponse= await connection.query("SELECT role FROM users WHERE user = ?", user)
        
        return dbResponse[0]['role']

    } catch (error) {
        throw new Error(error)
    }
};

const consultUserPass = async(user, pass)=>{
    //devuelve el ok si el user y el pass son correctos

    try {
        //formatear usuario(en minusculas y sin espacios ni saltos de linea)

        console.log(user, pass);

        //consulta a la base de datos
        const connection = await getConnection();
        const userResponse = await connection.query("SELECT user, pass FROM users WHERE user = ?", user)
            .then(DBResponse=>{
                //verifica si la clave coincide
                if (DBResponse[0].pass === pass){
                    return user;
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

const getUsersInfo = async ()=>{
    
}
const getTotalInfo = async ()=>{

}

export const userDbHelper ={
    consultUserPass,
    getUserRole
}