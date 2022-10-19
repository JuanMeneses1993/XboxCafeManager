
import {isAfter,differenceInSeconds, formatISO9075, formatDistanceToNowStrict, parse, addHours, secondsToHours, secondsToMinutes, minutesToSeconds, hoursToSeconds, setDate, addMinutes, addSeconds, startOfDay, subHours, minutesToHours, hoursToMinutes} from 'date-fns'
import{format, getTimezoneOffset, toDate, utcToZonedTime} from 'date-fns-tz'
import e from 'express'
import { dataBaseHelper } from './dataBase.helper'


function getCurrentDate(){
//Devuelve la fecha y la hora actual en gmt+0
//Devuelve un objeto de la clase Date
    const parsedDate = toDate(new Date())
    const azoresDate = utcToZonedTime(parsedDate, 'Atlantic/Azores')
    const currentDate = format(azoresDate, 'yyyy-MM-dd HH:mm:ssxxx', { timeZone: 'Atlantic/Azores' })
    const currentDateParsed = parseDate(currentDate)
    
    return currentDateParsed
    
}
function parseDate(date){
    //Devuelve un objeto Date con la fecha que le pasemos 
    //en el formato 'yyyy-MM-dd HH:mm:ssxxx'
    const parsed = toDate(new Date(date), { timeZone: 'Atlantic/Azores' })
    
    return parsed
}
function formatDate(date){
    const parsedDate = toDate(new Date(date))
    const azoresDate = utcToZonedTime(parsedDate, 'Atlantic/Azores')
    const formated = format(azoresDate, 'yyyy-MM-dd HH:mm:ssxxx', { timeZone: 'Atlantic/Azores' })
    
    return formated
}
function getTimeLeft(endTime){
    //recibe una fecha como parametro 
    //y calcula el tiempo que falta para esa hora desde la hora actual
    //devuelve un contador en el formato HH:mm:ss

    //si el valor que se le pasa es completado devuelve 00:00:00
    if (endTime === 'completado'){
        return '00:00:00'
    }

    //revisar si la fecha final es mayor que la actual
    const endTimeParsed = parseDate(endTime)
    if (isAfter(getCurrentDate(), endTimeParsed)){
        //revisar y actualizar todos los end time
        //dataBaseHelper.updateTimeEnd()
        //y devolver 00:00:00
        return '00:00:00'
    }
    //pasar el tiempo restante a segundos
    const secondsLeft = differenceInSeconds(endTimeParsed, getCurrentDate())
    
    //transformar los segundos a un contador en formato HH:mm:ss
    const leftTime = secondsToTimmer(secondsLeft)
    return leftTime
    
}
const secondsToTimmer = (seconds)=>{

    const date = new Date(null);
    //agregar los segundos
    date.setSeconds(seconds); 
    const formated = date.toISOString().slice(11, 19);
    return formated
    
}

const getEndTime = (minutesToAdd) =>{
    const currentDate = getCurrentDate()
    const added = addMinutes(currentDate, minutesToAdd)
    const formated = formatDate(added)
    return formated
}


//console.log(getTimeLeft('2022-10-09 12:46:20+00:00'))


export const timeHelper ={
    getCurrentDate,
    parseDate,
    formatDate,
    getTimeLeft,
    getEndTime,
}