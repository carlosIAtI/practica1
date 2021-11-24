// 1. Importar el modulo http
import http from "http";
import routes from "./routes.js"
import Expres from 'express'

//Crear una instancia de express
const app = Expres();

//Registrando el primer middleware
app.use((req, res, next)=>{
  console.log("Estoy en el middleware 1");
  // Dar la instruccion de pasar al siguiente middleware
  next()
});
app.use((req, res, next)=>{
  console.log("Estoy en el middleware 2");
  // Dar la instruccion de pasar al siguiente middleware
  next()
});

app.use((_, res)=>{
  console.log("Estoy en el middleware 3");
  console.log("Emitiendo respuestas a cliente");
  res.end("<h1>Hola Mundo!!</h1>");
  // Dar la instruccion de pasar al siguiente middleware
  
});

// poniendo a escuchar la aplicacion de express
app.listen(3000, 'localhost',() => {
  console.log("👩‍🍳 Servidor  escuchando en http://0.0.0.0:3000");
});
