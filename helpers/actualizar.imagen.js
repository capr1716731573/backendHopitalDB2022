const fs= require('fs');

const UsuarioModel= require('../models/usuario.model');
const HospitalModel= require('../models/hospitales.model');
const MedicoModel= require('../models/medicos.model');

const borrarImagen=(path) =>{
    if(fs.existsSync(path)){
        //Borrar imagen anterior
        fs.unlinkSync(path)
    }
}

const actualizarImagen= async (tipo, id, path, nombreArchivo)=>{
   

    switch (tipo) {
        case 'medicos':

            const medico= await MedicoModel.findById(id);
            
            if(!medico) return false;
            
            const pathViejo=`./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);
            
            medico.img=nombreArchivo;
            medico.save();
            return true;
            
            break;
        case 'hospitales':
            
           
            const hospital= await HospitalModel.findById(id);
            
            if(!hospital){
                return false;
            } 
            //console.log(`Hospital: `+JSON.stringify(hospital));
            borrarImagen(`./uploads/hospitales/${hospital.img}`);
            
            hospital.img=nombreArchivo;
            hospital.save();
            return true;

            break;
    
        case 'usuarios':

        
            const usuario= await UsuarioModel.findById(id);
            
            if(!usuario) return false;
            
            borrarImagen(`./uploads/usuarios/${usuario.img}`);
            
            usuario.img=nombreArchivo;
            usuario.save();
            return true;
        
            break;
    
        default:
            break;
    }
}

module.exports={
    actualizarImagen
}