const path = require('path');



const sendAdminJuanito = (req, res)=>{
    
    res.sendFile(path.join(__dirname+'./../static/adminJuanito.html'));
};

export const methods = {
    sendAdminJuanito
};