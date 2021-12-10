// 1 Importando el enrutador de Express
import { Router } from 'express';

import path from 'path'

//importando helper
import { ROOT_DIR  } from '../helpers/path.helper.js'

// importando el acceso a la base de datos
import { products } from './admin.route.js'
// 2 Crear una instancia del enrutador
const router = Router();

// Se debe colocar primero ya que el orden de registro
// determina el orden de verificación
router.get('/about',(_,res)=>{
  res.send("<h1>💡 Acerca de...</h1>\n🙋‍♂️ Sitio inicial hecho con NodeJs");
});

// La ruta raíz entra en todo tipo de petición
router.get(['/','/home'],(_, res)=>{
  console.log(`Inventario de productos: ${JSON.stringify(products)}`);
  const filepath = path.join(ROOT_DIR, "server", "views", "shop.html");
  res.sendFile(filepath);
});

export default router;
