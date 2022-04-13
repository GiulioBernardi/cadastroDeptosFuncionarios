import { diskStorage, Options } from 'multer'
import { resolve } from 'path'

export const multerConfig = {
    dest: resolve(__dirname, '..', '..', 'uploads'),
    storage: diskStorage({
        destination: (request, file, callback) =>{
            callback(null, resolve(__dirname, '..', '..', 'uploads'))
        },
        filename:(request, file, callback) =>{
            callback(null, new Date().toISOString().replace(/:/g, "-") + file.originalname.replace(" ", "_"));                    
        }
    }),
    limits:{
        fileSize: 5*1024 * 1024
    },
    fileFilter: (request, file, callback) =>{
        const formats = ['image/png', 'image/jpeg', 'image/jpg ']
        if(formats.includes(file.mimetype)){
            callback(null, true)
        } else{
            callback(new Error("Formato não aceito"))
        }
    }
    
} as Options