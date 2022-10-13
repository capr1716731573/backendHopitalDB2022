const {Schema, Model, model} = require('mongoose');

const MedicoSchema= Schema({
    nombre:{
        type:String,
        require:true
    },
   
    img:{
        type:String,
    },
    usuario:{
        require:true,
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    },
    hospital:{
        require:true,
        type:Schema.Types.ObjectId,
        ref:'Hospital'
    },
},{collection:'Medicos'});

//Personalizar el nombre del campo _id a uid y extraccion de los campos
MedicoSchema.method('toJSON', function(){
    const {_v,...object}= this.toObject();
    return object;
});

module.exports= model('Medico',MedicoSchema);