import express from "express";
import db from "./config/dbConnect.js";
import livros from "./models/Livro.js"

db.on("error", console.log.bind(console, "Erro ao conectar no banco"));
db.once("open", () => {
    console.log("Banco de dados conectado com sucesso");
})

const app = express();
app.use(express.json());

function buscaLivro(id) {
    return livros.findIndex(livro => livro.id == id)
}

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node');
}) 
  
app.get('/livros', (req, res) => {
    livros.find((err, livros) =>{
        res.status(200).json(livros)
    })
})

app.get('/livros/:id', (req, res) => {
    let {id} = req.params;
    let index = buscaLivro(id);
    res.json(livros[index]);
  })

app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).send('Livro foi cadastrado com sucesso')
})

app.put('/livros/:id', (req, res) => {
    let {id} = req.params;
    let index = buscaLivro(id);
    livros[index].titulo = req.body.titulo;
    res.status(200).send(`Livro ${id} atualizado com sucesso`)
})

app.delete('/livros/:id', (req, res) => {
    let {id} = req.params;
    let index = buscaLivro(id);
    livros.splice(index, 1);
    res.send(`Livro ${id} removido com sucesso`);
  })

export default app;