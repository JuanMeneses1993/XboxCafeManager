import { json } from "body-parser";
import { response } from "express";
import { Connection } from "promise-mysql";
import { getConnection } from "../database/database";
import {timeHelper} from "./../helpers/time.helper";
import {tvDbHelper} from "./../helpers/dataBase.helper";
import { parse } from "dotenv";
import { tvHelper } from "../helpers/tv.helper";
import { clientDbHelper } from "../helpers/client.dataBase.helper";


const activateTv = async (req, res)=>{

    try {
        //extraer datos
        let {activateTvNumber, activateTvHours, activateTvMinutes, activateTvUser, activateTvPass} = req.body;

        
        //convertir a minutos
        const leftMinutes = (Number(activateTvHours)*60) + Number(activateTvMinutes);
    
        //consultar si el televisor esta ocupado
        const isActive = await tvDbHelper.consultTvNumber(activateTvNumber);
        
        //verifica user y pas si no responde con un error 
        const user = await clientDbHelper.consultUserPass(activateTvUser, activateTvPass);
        
        //consultar si el tiempo que se esta pidiendo se menor o igual al saldo en minutos disponible
        await clientDbHelper.consultUserLeftMinutes(leftMinutes, user);
        
        //RESTAR TIEMPO AL USUARIO
        const updateClientLeftTimeResponse = await clientDbHelper.updateClientMinutesLeft(user, leftMinutes);
        
        //SUMAR TIEMPO AL EMPLEADO PENDIENTE
   
        //Actualizar la base de datos
        await tvDbHelper.updateTv(activateTvNumber, leftMinutes, user);
        //Activar el televisor
        tvHelper.activateTv(activateTvNumber)
        res.send("Equipo activado con exito");
    } catch (error) {
        res.send(String(error));
    };

};

const deactivateTv = async (req, res)=>{
    try {
        tvHelper.deactivateTv(req.params['tvNumber'])
        tvDbHelper.deactivateTv(req.params['tvNumber'])
        res.sendStatus(200)
        
    } catch (error) {
        res.send(500)
    }
};

const tvInfo = async (req, res)=>{
//Devuelve todos las propiedades actuales de Todos los TVs
    
    //consulta a la base de datos
    const dbResponse = await tvDbHelper.getTvInfo(req, res);
    res.json(dbResponse);

};

export const tvController = {
    activateTv,
    deactivateTv,
    tvInfo,
}
