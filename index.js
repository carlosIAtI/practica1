// 1. Importar el modulo http
import routes from "./routes.js"
import Express from 'express'

//Crear una instancia de express
const app = Express();
console.log(`Variable de entorno: ${process.env.NODE_ENV}`);
//insertando  e MiddelWare para la lectura de datos
//desde un cliente||
app.use(Express.urlencoded({extended: false}));
//Registrando el primer middleware
//se debe color primero ya que el orden de registro 
//determina el orden
//
//Loggin de peticiones
app.use((req,_,next)=>{
  console.log(`Se ha realizado la peticion: "${req.method}: ${req.path}"`);
  next();
  
});
app.use('/about',(_,  res)=>{
  res.send("<h1>Peticion a ruta about</h1>");
  // Dar la instruccion de pasar al siguiente middleware
});

app.use('/add-student-form', (_, res)=>{
  res.send(`
  <form action="/add-student" method="POST">
  <label for="student-name">Student name</label>
  <input type="text" name="name" id="student-name">  
  <button type="submit">Add student</button>
  </form>
  `);   

});

app.post('/add-student', (req, res, next)=>{
  for(const prop in req.body ){

    console.log(`${prop}: ${req.body[prop]}`);

  }
 console.log(`🚩 Metodo: ${req.method}`)
    //Realizamos un redireccionamiento
    res.json(req.body);
    //res.redirect('/');
}); 

app.use(['/','/home'] ,(_, res)=>{
  res.send("<h1>Hola Mundo!!</h1>");
});

// poniendo a escuchar la aplicacion de express
app.listen(3000, 'localhost',() => {
  console.log(" Servidor  escuchando en http://0.0.0.0:3000");
});
