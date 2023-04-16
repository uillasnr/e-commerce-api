/* Configurações do multer. Upload de imagens.
Obs: Não se armazena imagens em banco de dados, 
o melhor a ser feito é armazenar em uma CDN. Como está 
aplicação é pequena as imagens serão armazenadas numa pasta.
*/

import multer from 'multer'
import { v4 } from 'uuid'
import path, { extname, resolve } from 'path'

 export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'uploads'),
        filename: (request, file, callback) => {
            return callback(null, v4() + path.extname(file.originalname))
        }
    })
} 

  







  