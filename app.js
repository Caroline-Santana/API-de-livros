/*****************************************************
 * Objetivo: Fazer uma API que retorne a função criada
 * Data: 12/09/2022
 * Autor: Caroline A.
 * Versão: 1.0
 *****************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require ('body-parser')

const {buscandoWords} = require('./modulo/livro.js')

const app = express()

app.use((request, response, next)=>{

    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors())
    next()
})

app.get('/livros/:chave', cors(), async function(request, response, next){
    //Recebe a variavel que sera enviada na requisição por parametro
    let chave = request.params.chave
    let livrosEncontrado =  buscandoWords(chave)

    if(livrosEncontrado){
        response.status(200)
        response.json(livrosEncontrado)
    }else{
        response.status(404)
    }

})
//EndPoint para filtrar os livros
app.get('/livros/', cors(), async function(request, response, next){

    //Recebe a variável nome por QueryString(indicada quando precisamos criar filtros) 
    let chave = request.query.nome 
    let livrosEncontrado =  buscandoWords(chave)
    if(livrosEncontrado){
        response.status(200)
        response.json(livrosEncontrado)
    }else{
        response.status(404)
    }

 
})


app.listen(1313, function(){
    console.log('Servidor aguardando requisições')
})