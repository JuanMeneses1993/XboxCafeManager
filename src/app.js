import express from "express";
import morgan from "morgan";
import tv from "./routes/tv.routes";
import bodyParser from "body-parser";
import cors from "cors"

const router = express.Router();

const app = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(cors())
app.use('/public', express.static(__dirname+'/public'));
//app.use(morgan("dev"));//mostrar las solicitudes
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

// Routes
app.use("/tv", tv);

export default app;
