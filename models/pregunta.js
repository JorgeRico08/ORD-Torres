const mongoose = require('mongoose');

const preguntaSchema =mongoose.Schema({
    nombreUsuario:{
        type:String
    },
    pregunta:[{
        type:mongoose.ObjectId,
        ref:"orders"
    }],
       
})

const Preguntas= mongoose.model("preguntas",preguntaSchema)
module.exports=Preguntas;
