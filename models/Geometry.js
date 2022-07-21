const mongoose = require('mongoose')

const polygonSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['MultiPolygon'],
        required: true
    },
    coordinates: {
        type: [[[[Number]]]],
        required: true
    }
})


const citySchema = new mongoose.Schema({
    type: String,
    properties: {
        ID: Number,
        TIPO_LOGR: String,
        LOGRADOURO: String,
        ZONA: String,
        COEF_APROV: String,
        T.O.MAXIMA: String,
        
    }
},
{
    timestamps: true,
})

mongoose.model('geometry', city_Layer)