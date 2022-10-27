import { json } from "body-parser";
import { response } from "express";
import { Connection } from "promise-mysql";
import { getConnection } from "../database/database";
import {timeHelper} from "./../helpers/time.helper";
import {dataBaseHelper} from "./../helpers/dataBase.helper";
import { parse } from "dotenv";
import { tvHelper } from "../helpers/tv.helper";
import { clientDbHelper } from "../helpers/client.dataBase.helper";


const getUserMinutes = async (req, res)=>{
    try {
        const user_form = req.params['userName']
        console.log(user_form)
        const leftMinutes = await clientDbHelper.getClientLeftMinutes(user_form);
        
        res.send(String(leftMinutes))
        
    } catch (error) {
        res.status(400).send(String(error))
    }
};

const addMinutesToUser = async (req, res)=>{
    try {
        //extraer los datos
        const {clientUpdateUser, clientUpdateHours} = req.body;

        //validar datos
        //verificar si los minutos no son mayores a de 30 y si las horas no son mayores de 8 ni menores a 0
        if (Number(clientUpdateHours) < 0 ||
            Number(clientUpdateHours) > 8 ){
                throw new Error ('Parametros de tiempo invalidos')
            }
        //actualizar los minutos en la base de datos
        await clientDbHelper.addMinutesToClient(clientUpdateUser, clientUpdateHours, '0')
        

        res.status(200).send('Tiempo agregado satisfactoriamente')
    } catch (error) {
        console.error(error)
        res.send(String(error))
    }
};

const createNewUser = async (req, res)=>{
    try {
        //extraer los datos
        const {clientRegistrationUser, clientRegistrationPass, clientRegistrationPassRepeat} = req.body

        //verificar si las contrasenas son iguales
        if (clientRegistrationPass !== clientRegistrationPassRepeat){
            throw new Error ('Las claves no coinciden')
        }

        //revisar si el nombre de usuario ya esta en uso
        await clientDbHelper.isUserExist(clientRegistrationUser)
        
        //agregar el cliente a la base de datos
        await clientDbHelper.createNewClient(clientRegistrationUser, clientRegistrationPass)
        
        res.status(200).send('Usuario creado satisfactoriamente')
    } catch (error) {
        res.status(400).send(String(error))
    }
};

export const clientController = {
    getUserMinutes,
    addMinutesToUser,
    createNewUser
}
