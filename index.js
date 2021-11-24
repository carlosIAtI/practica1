// 1. Importar el modulo http
import http from "http";
import routes from "./routes.js"
/** * Codigos de Emojies * Ref: https://www.w3schools.com/charsets/ref_emoji.asp 
*/// 2. Crear el servidor// cb (callback) es una *funcion* que se ejecutara

const server = http.createServer(routes.requestHandler); 
// 3. Pongo a trabajar el servidor
// le paso un callback que escribira en la consola
// cuando el servidor este escuchando//
// 192.168.100.11:3000
server.listen(3000, "0.0.0.0", () => {
  console.log("👩‍🍳 Servidor escuchando en http://0.0.0.0:3000");
});
