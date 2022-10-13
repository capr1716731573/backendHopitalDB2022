const {Schema, Model, model} = require('mongoose');

const HospitalSchema= Schema({
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
   }
},{collection:'Hospitales'});

//Personalizar el nombre del campo _id a uid y extraccion de los campos
HospitalSchema.method('toJSON', function(){
    const {_v,...object}= this.toObject();
    return object;
});

module.exports= model('Hospital',HospitalSchema);