import { json } from "body-parser";
import { response } from "express";
import { Connection } from "promise-mysql";
import { getConnection } from "../database/database";
import {timeHelper} from "./../helpers/time.helper";
import {dataBaseHelper} from "./../helpers/dataBase.helper";
import { parse } from "dotenv";
import { tvHelper } from "../helpers/tv.helper";


const activateTv = async (req, res)=>{


    try {
        //extraer datos
        let {tvNumber, tvHours, tvMinutes, tvUser, tvPass } = req.body;
        let tvNumber_form =  tvNumber;
        let tvHours_form = tvHours;
        let tvMinutes_form = tvMinutes;
        let user_form = tvUser;
        let pass_form = tvPass;
  
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
        //Activar el televisor
        tvHelper.activateTv(tvNumber_form)
        res.send("Equipo activado con exito");
    } catch (error) {
        console.log(error)
        res.send(error);
    };

};

const deactivateTv = async (req, res)=>{
    try {
        tvHelper.deactivateTv(req.params['tvNumber'])
        dataBaseHelper.deactivateTv(req.params['tvNumber'])
        res.sendStatus(200)
        
    } catch (error) {
        res.send(500)
    }
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
