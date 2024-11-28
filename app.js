// importar o modulo express
const express = require('express');

// importar modulo mysql
const mysql = require('mysql2');

// app
const app = express();

// configuração de conexão
const conexao = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'ifsp',
    database:'diario_saude'
});

// teste de conexão
conexao.connect(function(erro){
    if(erro) throw erro;
    console.log('Conexao efetuada');
});

// rota hello world
app.get('/', function(req, res){
    res.write('hello world');
    res.end();
});

// Servidor
app.listen(8080);