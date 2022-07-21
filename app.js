// incluindo dependencias
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')

//
require("./models/Geometry")
const Geometry = mongoose.model('geometry');

// executar funcao do express
const app = express();

// permitir acesso do dado no formato JSON
app.use(express.json());

// adiconando cors para permitir as url para requisição da API
// app.use((req, res, next) => {
//     res.header("Acess-Control-Allow-Origin", "*");
//     req.header("Acess-Control-Allow-Methods", "GET, PUT, POST, DELETE")
//     app.use(cors());
//     next();
// })

mongoose.connect('mongodb://localhost/api',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Conexão com MongoDB realizada com sucesso!")
}).catch((err)=>{
    console.log("Erro: Conexão com MongoDB não realizada com!")
})

//Listar
app.get("/geometry", (req,res)=>{
    //constante recebendo a models, find buscando todos registros com 0 restrições, then caso consiga executar com sucesso e retornar receba os dados para retornar
    Geometry.find({}).then((geometry) => {
        return res.json(geometry)
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        })
    })
});

//Visualizar
app.get("/geometry/:id", (req,res) => {
    Geometry.findOne({id: req.params.id
    }).then((geometry) => {
        return res.json(geometry)
    }).catch((err) =>{
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        })
    })
})

// Cadastrar
app.post("/geometry", (req,res) => {
    const geometry = Geometry.create(req.body, (err) => {
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

// Editar
app.put("/geometry/:id", (req, res) => {
    const geometry = Geometry.updateOne({_id: req.params.id}, req.body, (err)=> {
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

// Deletar
app.delete("/geometry/:id", (req, res) => {
    const artigo = Geometry.deleteOne({_id: req.params.id}, (err) =>{
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Elemento não obteve exito para excluir o elemento!"
        })
        return res.json({
            error: false,
            message: "Elemento excluido com sucesso!"
        })
    })
})


// para ver o resultado precisa rodar o servidor
// para isso precisa da funcao listener para expor a porta
app.listen(8080, () =>{
    console.log("Server iniciado na porta 8080: ")
})