// 1 Importando el enrutador de Express
import { Router } from 'express';
import path from 'path'
import { ROOT_DIR } from '../helpers/path.helper.js'

// 2 Crear una instancia del enrutador
const router = Router();
 
// 3 Registrar rutas a mi enrutador
// Sirve el formulario para agregar productos
// GET: /admin/add-product
router.get('/add-product',(_, res)=>{
  const filepath = path.join(ROOT_DIR, "server", "views", "add-product.html")
  res.sendFile(filepath);
});
// Procesa el formulario para agregar productos
// POST: /admin/add-product
router.post('/add-product',(req, res)=>{
  // Desestructurando el body de la petición
  const { body } = req;
  // Respondiendo en JSON el body
  res.json(body);
});

// Exportando el router de la subruta de admin
export default router;
