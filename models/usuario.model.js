const {Schema, Model, model} = require('mongoose');

const UsuarioSchema= Schema({
    nombre:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    img:{
        type:String,
    },
    role:{
        type:String,
        require:true,
        default:'USER_ROLE'
    },
    google:{
        type:Boolean,
        require:false
    }
});

//Personalizar el nombre del campo _id a uid y extraccion de los campos
UsuarioSchema.method('toJSON', function(){
    const {_v,_id,...object}= this.toObject();
    object.uid=_id;
    return object;
});

module.exports= model('Usuario',UsuarioSchema);