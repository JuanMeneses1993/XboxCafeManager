import { json } from "body-parser";
import { response } from "express";
import { parse } from "dotenv";
import { userDbHelper } from "../helpers/users.db.helper";
import { verifiers } from "../helpers/verifiers.helper";


const checkUserPass = async(req, res)=>{
    try {
        const {user, pass} = req.body;

        if (!user || !pass) {
            res.send('error de logueo');
        }
        console.log(user, pass)
        await userDbHelper.consultUserPass(user, pass);
        const role = await userDbHelper.getUserRole(user);

        req.session.user = user;
        req.session.role = role;
        res.send('ok');
    } catch (error) {
        res.send('error de logueo')
    }
};

const logOut = async(req, res)=>{
    req.session.destroy();
    res.send("Deslogueado");
};

const createUser = async(req, res)=>{
        
};

const readUser = async(req, res)=>{

};

const readUsers = async(req, res)=>{
    
// Informacion de los empleados

// tiempo activo mes
// tiempo activo semana

// tiempo vendido mes
// tiempo vendido semana
// tiempo vendido dia
};

const readTotal = async(req, res)=>{

};

const deleteUser = async(req, res)=>{

};


export const usersController = {
    checkUserPass,
    logOut,
    readUser,
    readUsers,
    createUser,
    deleteUser
};
