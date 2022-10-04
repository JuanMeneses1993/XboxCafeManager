import express from "express";
import morgan from "morgan";
// Routes
import clienteRoutes from "./routes/cliente.routes";
import staticRoutes from "./routes/static.routes";


const router = express.Router();

const app = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/clientes", clienteRoutes);


//Static

app.use('/', staticRoutes)

// app.get('/adminJuanito',function(req,res){
//     console.log("jal")
//     res.sendFile(path.join(__dirname+'/static/adminJuanito.html'));
// });


export default app;
