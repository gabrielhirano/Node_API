// incluindo dependencias
const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose')

//
require("./models/Artigo")
const Artigo = mongoose.model('artigo');

// executar funcao do express
const app = express();

mongoose.connect('mongodb://localhost/api',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Conexão com MongoDB realizada com sucesso!")
}).catch((err)=>{
    console.log("Erro: Conexão com MongoDB não realizada com!")
})

// permitir acesso do dado no formato JSON
app.use(express.json());

//Listar
app.get("/read/", (req,res)=>{
    //constante recebendo a models, find buscando todos registros com 0 restrições, then caso consiga executar com sucesso e retornar receba os dados para retornar
    Artigo.find({}).then((artigo) => {
        return res.json(artigo)
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        })
    })
});
//Visualizar
app.get("/read/:id", (req,res) => {
    Artigo.findOne({id: req.params.id
    }).then((artigo) => {
        return res.json(artigo)
    }).catch((err) =>{
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        })
    })
})
//Cadastrar
app.post("/insert", (req,res) => {
    const artigo = Artigo.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Artigo não foi cadastrado com sucesso com sucesso!"
        })
        return res.status(201).json({
            error: false,
            message: "Artigo cadastrado com sucesso com sucesso!"
        })
    })
})
app.put("/update/:id", (req, res) => {
    const artigo = Artigo.updateOne({_id: req.params.id}, req.body, (err)=> {
        if(err) return res.status(400).json({
            error: true,
            message:"Error: Sem exito para editar artigo"
        })
        return res.json({
            error: false,
            message: "Artigo alterado com sucesso!"
        })
    })
})
// para ver o resultado precisa rodar o servidor
// para isso precisa da funcao listener para expor a porta
app.listen(8080, () =>{
    console.log("Server iniciado na porta 8080: ")
})