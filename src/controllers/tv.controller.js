import { json } from "body-parser";
import { response } from "express";
import { Connection } from "promise-mysql";
import { getConnection } from "../database/database";

import {timeHelper} from "./../helpers/time.helper";
import {dataBaseHelper} from "./../helpers/dataBase.helper";

import { parse } from "dotenv";



const activateTv = async (req, res)=>{

    try {
        //extraer datos
        let {tvNumber_form, tvHours_form, tvMinutes_form, user_form, pass_form } = req.body;
        
        //convertir a minutos
        const leftMinutes = (Number(tvHours_form)*60) + Number(tvMinutes_form);
    
        //consultar si el televisor esta ocupado
        const isActive = await dataBaseHelper.consultTvNumber(tvNumber_form);
        
        //verifica user y pas si no responde con un error 
        const user_form_prosseced = await dataBaseHelper.consultUserPass(user_form, pass_form);

        //consultar si el tiempo que se esta pidiendo se menor o igual al saldo en minutos disponible
        await dataBaseHelper.consultUserLeftMinutes(leftMinutes, user_form_prosseced);
        
        //RESTAR TIEMPO AL USUARIO
        const updateClientLeftTimeResponse = await dataBaseHelper.updateClientMinutesLeft(user_form_prosseced, leftMinutes );
        
        //SUMAR TIEMPO AL EMPLEADO PENDIENTE
   
    
        //Actualizar la base de datos
        await dataBaseHelper.updateTv(tvNumber_form, leftMinutes, user_form_prosseced);
        res.send("Equipo activado con exito");
    } catch (error) {
        res.send(error);
    };

};

const deactivateTv = async (req, res)=>{

    res.send(`Hola desde deactivate Parametro: ${req.params['id']}`);
    //GET
    //validar datos
        //-revisar si la tv esta encendida o devolver error
    
    //si tiene usuario restar el tiempo



    //si no tiene usuario sumar al empleado el tiempo

    //apagar tv

    //responder con el tiempo total
};

const tvInfo = async (req, res)=>{
//Devuelve todos las propiedades actuales de Todos los TVs
    
    //consulta a la base de datos
    const dbResponse = await dataBaseHelper.getTvInfo(req, res);
    res.json(dbResponse);

};

export const tvController = {
    activateTv,
    deactivateTv,
    tvInfo,
}
