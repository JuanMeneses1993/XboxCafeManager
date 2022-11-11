import { json } from "body-parser";
import { response } from "express";
import { parse } from "dotenv";
import { userDbHelper } from "../helpers/users.db.helper";
import { verifiers } from "../helpers/verifiers.helper";
import { historyDbHelper } from "../helpers/history.db.helper";


const checkUserPass = async(req, res)=>{
    try {
        const {user, pass} = req.body;

        if (!user || !pass) {
            res.send('error de logueo');
            return 
        }
   
        await userDbHelper.consultUserPass(user, pass);
        const role = await userDbHelper.getUserRole(user);

        req.session.user = user;
        req.session.role = role;
        res.send('ok')

    } catch (error) {
        return res.send(String(error));
        
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
    

};

const getStatistics = async(req, res)=>{
try {
	    //Devuelve un objeto con todas las estadisticas
	    const rows = await historyDbHelper.getStatistics();
        

        res.send(rows)

} catch (error) {
	res.send(String(error))
};
};

const deleteUser = async(req, res)=>{

};


export const usersController = {
    checkUserPass,
    logOut,
    readUser,
    readUsers,
    createUser,
    deleteUser,
    getStatistics
};
