// incluindo dependencias
const express = require('express');
const mongoose = require('mongoose')
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
// criando rota
app.get("/", (req,res)=>{
    return res.json({titulo: "como criar uma API!!!!"})
});
// app.post("/artigo"(req,res)=>{
//     const artigo = Artigo.create(req.body,(err) =>{
//         if(err) return res.status(400).json({
//             error: true,
//             message: "Error: Artigo não foi cadastrado com sucesso!"
//         })
//         return res.status(200).json({
//             error: false,
//             message: "Artigo cadastrado com sucesso!"
//         })
//     })
// })
// para ver o resultado precisa rodar o servidor
// para isso precisa da funcao listener para expor a porta
app.listen(8080, () =>{
    console.log("Server iniciado na porta 8080: ")
})