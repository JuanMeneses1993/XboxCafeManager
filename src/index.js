import app from "./app";
import { dataBaseHelper } from "./helpers/dataBase.helper";
const main = () => {
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
    //Actualizar automaticamente la base de datos
    dataBaseHelper.updateTimeEnd()

};


main();

