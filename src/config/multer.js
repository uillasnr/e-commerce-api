/* Configurações do multer. Upload de imagens.
Obs: Não se armazena imagens em banco de dados, 
o melhor a ser feito é armazenar em uma CDN. Como está 
aplicação é pequena as imagens serão armazenadas numa pasta.
*/

import multer from 'multer'
import { v4 } from 'uuid'
import { extname, resolve } from 'path'

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'uploads'),
        filename: (request, file, callback) => {
            return callback(null, v4() + extname(file.originalname))
        }
    })
}



/* const storage = multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, callback) => {
      const newFilename = `${v4()}${extname(file.originalname)}`;
      callback(null, newFilename);
    },
  });
  
  const upload = multer({ 
    storage: storage,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB (max size of a file)
      files: 3 // max number of files
    }
  }).array('files', 3); // the name of the field that will contain the files, and the maximum number of files allowed
  
  export default upload; */