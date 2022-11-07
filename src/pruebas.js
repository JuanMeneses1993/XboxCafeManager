import { timeHelper } from "./helpers/time.helper";
import { historyDbHelper} from "./../src/helpers/history.db.helper"
import { tvDbHelper } from "./helpers/tv.db.helper";



const main = async()=>{
    await tvDbHelper.dbChecker()
}

main()


















//Variables del empleado en la base de datos

// id
// userName
// password
// isActive
// totalMinutesSold
// MinutesSoldToday
// MinutesSoldThisMonth


//Variables del historial en la base de datos

// mode
// timeActive
// clientName
// employeeName
// date
// hour

//Variables de las sesiones en la base de datos





