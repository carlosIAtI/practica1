// 1. Importar el modulo http
import http from "http";
import routes from "./routes.js"
import Expres from 'express'

//Crear una instancia de express
const app = Expres();
//Registrando el primer middleware
//se debe color primero ya que el orden de registro 
//determina el orden 
app.use('/about',(_, res)=>{
  console.log('Esto haciendo peticion para : "/about"');
  res.end("<h1>Peticion a ruta about</h1>");
  // Dar la instruccion de pasar al siguiente middleware
  
}), 
app.use(['/','/home'] (_, res)=>{
  console.log('Esto haciendo peticion para : "/home"');
  res.end("<h1>Hola Mundo!!</h1>");

});

// poniendo a escuchar la aplicacion de express
app.listen(3000, 'localhost',() => {
  console.log("👩‍🍳 Servidor  escuchando en http://0.0.0.0:3000");
});
