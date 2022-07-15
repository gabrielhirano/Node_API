// incluindo dependencia express
const express = require('express');
// executar funcao do express
const app = express();

// permitir acesso do dado no formato JSON
app.use(express.json());
// criando rota
app.get("/", (req,res)=>{
    return res.json({titulo: "como criar uma API"})
});
// para ver o resultado precisa rodar o servidor
// para isso precisa da funcao listener para expor a porta
app.listen(8080, () =>{
    console.log("Server iniciado na porta 8080: ")
})