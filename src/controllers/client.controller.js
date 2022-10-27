import { json } from "body-parser";
import { response } from "express";
import { Connection } from "promise-mysql";
import { getConnection } from "../database/database";
import {timeHelper} from "./../helpers/time.helper";
import {dataBaseHelper} from "./../helpers/dataBase.helper";
import { parse } from "dotenv";
import { tvHelper } from "../helpers/tv.helper";
import { clientHelper } from "../helpers/client.dataBase.helper";


const getUserMinutes = async (req, res)=>{
    try {
        const user_form = req.params['userName']
        console.log(user_form)
        const leftMinutes = await clientHelper.getClientLeftMinutes(user_form);
        
        res.send(String(leftMinutes))
        
    } catch (error) {
        res.status(400).send(String(error))
    }
};

const addMinutesToUser = async (req, res)=>{
    try {
        //extraer los datos
        const {user_form, hours_form, minutes_form} = req.body;
        console.log(user_form, hours_form, minutes_form)

        //validar datos
        //verificar si los minutos no son mayores a de 30 y si las horas no son mayores de 8 ni menores a 0
        if (Number(hours_form) < 0 ||
            Number(hours_form) > 8 ||
            Number(minutes_form) > 30 ){
                throw new Error ('Parametros de tiempo invalidos')
            }
        //actualizar los minutos en la base de datos
        await clientHelper.addMinutesToClient(user_form, hours_form, minutes_form)
        

        res.status(200).send('tiempo agregados satisfactoriamente')
    } catch (error) {
        res.send(String(error))
    }
};

const createNewUser = async (req, res)=>{
    try {
        //extraer los datos
        const {user_form, pass_form, pass_repeat_form} = req.body

        //verificar si las contrasenas son iguales
        if (pass_form !== pass_repeat_form){
            throw new Error ('Las claves no coinciden')
        }

        //revisar si el nombre de usuario ya esta en uso
        await clientHelper.isUserExist(user_form)
        
        //agregar el cliente a la base de datos
        await clientHelper.createNewClient(user_form, pass_form)
        
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
