import app from "./app";
import { dataBaseHelper } from "./helpers/dataBase.helper";
const main = async () => {
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);

    //Actualizar automaticamente la base de datos en caso de que se halla cumplido algun tiempo
    while (true){
        await dataBaseHelper.updateTimeEnd();
        //espera 100ms para volver a entrar en el bucle
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100);
  
    }


};


main();

