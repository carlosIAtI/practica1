import fs from "fs"

const requestHandler = (req , res) =>{

  // Obteniendo el recurso solicitado  
let { url, method } = req;
  // Informa en la consola del servidor que se recibe una petición  
console.log(`📮 Se ha solicitado el siguiente recurso: ${method}: ${url}`);

    // filtrar la url 
    if(url === '/'){
   // Respuesta ante "Get /"   
    // 1. Estableciendo el tipo de retorno   
    // como HTML    
    res.setHeader('Content-Type', 'text/html');
    // 2. Escribiendo la respuesta    
    // Cerrando conexion    
      res.write(`
      <html>
        <head>
          <title>Enter message</title>
        <head>
        <body>
        <h1>Send Message</h1>
        <form action ="/message" method="POST">
          <input  type="text" name="message">
          <Button type="submit">send</Button>
        </form>
      </body>
    </html>
      `);
      res.end();

    }else if(url === "/message" && method === "POST"){
      //1 Se crea una variable para guardar los datos de entrada

      let body = [];
      //2.- Registrar un manejador para la entrada de los datos
      req.on("data", (chuck) =>{
      //2,1. Resgistrando los trozos que llegan al backend
      console.log(chuck);
      //2.2 Acumulo los datos de entrada
      body.push(chuck);
      //2.3 proteccion en caso de recepcion masiva de datos
      if(body.length > 1e6 ) req.socket.destroy();
      });

      //EjecutandoOperacion (ARG1, ARG2, ARG3, cb)
      //Modelo Asincrono 
      //

      //3.1 Registrando un manejaor  de fin de recepcion de datos
      req.on("end", () => {
        const parseBody = Buffer.concat(body).toString();
        const message = parseBody.split("=")[1];
        //Guardando el mensaje en un archivo
        fs.writeFile('message.txt', message, (err)=>{
          //verificar su hubo un error
          if(err){
            console.log("> No se pude graba archivo"),
            res.statusCode = 500; //Internal Server Error
            
            res.setHeader("Content-Type", "text,html");
            res.write("Error when loading file")
            return res.end();

            }
        });

        res.status = 302;
        res.setHeader('Location', '/');
        //Finalizando conexion
        return res.end();
      });
      
    }else if(url === "/author"){
      //Resultado del Get
      ////Estableciendo el tipo de retorno
      //como HTML
      res.setHeader("Content-Type", "text,html");
      let url_image = "https://w.wallhaven.cc/full/lq/wallhaven-lq2q2r.png";
      //Escriendo la respuesta
      res.write("<html>");
      res.write("<head><title>My app</title></head>");
      res.write("<body>");
      res.write("");
    }else{
      
    // Se registra el Recurso no encontrado
    console.log(`❌ No se ha econtrado el recurso: ${url}`);
    // Recurso no econtrado
    // 1. Estableciendo el tipo de retorn
    // como HTML
    res.setHeader('Content-Type', 'text/html');

    // 2. Escribiendo la respuesta
    res.write('<html>');
    res.write('<head><title>My App</title></head>');
    res.write('<body><h1>Error: 404 - Recurso no encontrado &#9940;</h1></body>');
    res.write('</html>');
    // Cerrando conexion
    res.end();
    }   

  
};

export default {
 requestHandler
};
