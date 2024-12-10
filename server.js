// importar o modulo express
const express = require('express');

// importar modulo mysql
const mysql = require('mysql2');

// importar modulo cors
const cors = require('cors');

// app
const app = express();

// manipulação de dados via rotas
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// fix cors error
const corsOptions = {
    origin:'*', 
    credentials:true,         
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions))

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

// Rota criar conta
app.post("/criar-conta", async (req, res) => {
    const body = req.body;
    const {name, email, telefone, dataNascimento, password} = body;

    // SQL
    let sql = `INSERT INTO usuario (nome, telefone, data_nascimento, email, senha) VALUES ('${name}', '${telefone}', '${dataNascimento}', '${email}', '${password}')`;

    // executar comando sql
    conexao.query(sql, function(erro, retorno){
        //caso ocorra um erro
        if(erro) {
            res.statusCode = 500
            res.setHeader("Content-Type", "text/plain")
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.json(erro)
        } 

        // caso ocorra o cadastro
        res.statusCode = 200
        res.setHeader("Content-Type", "text/plain")
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.json(retorno)
    });
})

app.post("/adicionar-consulta", async (req, res) => {
    const body = req.body;
    const {medico, especialidade, local_consulta, data_consulta, horario_consulta, observacoes, idusuario} = body;

    // SQL
    let sql = `INSERT INTO consulta (medico, especialidade, local_consulta, data_consulta, horario_consulta, observacoes, idusuario) VALUES 
                ('${medico}', '${especialidade}', '${local_consulta}', '${data_consulta}', '${horario_consulta}', '${observacoes}', ${idusuario})`;

    // executar comando sql
    conexao.query(sql, function(erro, retorno){
        //caso ocorra um erro
        if(erro) {
            console.log(erro)
            res.statusCode = 500
            res.setHeader("Content-Type", "text/plain")
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.json(erro)
        } 

        // caso ocorra o cadastro
        res.statusCode = 200
        res.setHeader("Content-Type", "text/plain")
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.json(retorno)
    });
});

app.post("/adicionar-medicamento", async (req, res) => {
    const body = req.body;
    const {nome, sigla, dosagem, frequencia, data_medicamento, horario_medicamento, idusuario} = body;

    // SQL
    let sql = `INSERT INTO medicamento (nome, sigla, dosagem, frequencia, data_medicamento, horario_medicamento, idusuario) VALUES 
                ('${nome}', '${sigla}', '${dosagem}', '${frequencia}', '${data_medicamento}', '${horario_medicamento}', ${idusuario})`;

    // executar comando sql
    conexao.query(sql, function(erro, retorno){
        //caso ocorra um erro
        if(erro) {
            console.log(erro)
            res.statusCode = 500
            res.setHeader("Content-Type", "text/plain")
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.json(erro)
        } 

        // caso ocorra o cadastro
        res.statusCode = 200
        res.setHeader("Content-Type", "text/plain")
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.json(retorno)
    });
});

// rota listar dados de usuario
app.get('/meus-dados', function(req, res){
    // SQL
    let sql = `SELECT * FROM usuario WHERE idusuario = ${req.query.idusuario} LIMIT 1`;

    // executar comando sql
    conexao.query(sql, function(erro, retorno){
        //caso ocorra um erro
        if(erro) {
            res.statusCode = 500
            res.setHeader("Content-Type", "text/plain")
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.json(erro)
        } 

        // caso ocorra o cadastro
        res.statusCode = 200
        res.setHeader("Content-Type", "text/plain")
        res.setHeader("Access-Control-Allow-Origin", "*")
        const response = {usuario: retorno[0]}
        console.log(response)
        res.json(response)
    });

});

// rota para lustar a tabela dados usuario
app.get('/dados-usuario', function(req, res){
    // SQL
    let sql = `SELECT * FROM dados_usuario WHERE idusuario = ${req.query.idusuario} LIMIT 1`;

    // executar comando sql
    conexao.query(sql, function(erro, retorno){
        //caso ocorra um erro
        if(erro) {
            res.statusCode = 500
            res.setHeader("Content-Type", "text/plain")
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.json(erro)
        } 

        // caso ocorra o cadastro
        res.statusCode = 200
        res.setHeader("Content-Type", "text/plain")
        res.setHeader("Access-Control-Allow-Origin", "*")
        const response = {dadosUsuario: retorno[0]}
        console.log(response)
        res.json(response)
    });

});

// rota para listar consultas
app.get('/consultas', function(req, res){
    // SQL
    let sql = `SELECT * FROM consulta WHERE idusuario = ${req.query.idusuario}`;

    // executar comando sql
    conexao.query(sql, function(erro, retorno){
        //caso ocorra um erro
        if(erro) {
            res.statusCode = 500
            res.setHeader("Content-Type", "text/plain")
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.json(erro)
        } 

        // caso ocorra o cadastro
        res.statusCode = 200
        res.setHeader("Content-Type", "text/plain")
        res.setHeader("Access-Control-Allow-Origin", "*")
        const response = {consultas: retorno}
        console.log(response)
        res.json(response)
    });

});

app.get('/medicamentos', function(req, res){
    // SQL
    let sql = `SELECT * FROM medicamento WHERE idusuario = ${req.query.idusuario}`;

    // executar comando sql
    conexao.query(sql, function(erro, retorno){
        //caso ocorra um erro
        if(erro) {
            res.statusCode = 500
            res.setHeader("Content-Type", "text/plain")
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.json(erro)
        } 

        // caso ocorra o cadastro
        res.statusCode = 200
        res.setHeader("Content-Type", "text/plain")
        res.setHeader("Access-Control-Allow-Origin", "*")
        const response = {medicamentos: retorno}
        console.log(response)
        res.json(response)
    });
});

app.post("/login", async (req, res) => {
    const body = req.body;
    const {email, senha} = body;

    // SQL
    let sql = `SELECT idusuario FROM usuario WHERE email = "${email}" AND senha = "${senha}"`;

    // executar comando sql
    conexao.query(sql, function(erro, retorno){
        //caso ocorra um erro
        if(erro) {
            console.log(erro)
            res.statusCode = 500
            res.setHeader("Content-Type", "text/plain")
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.json(erro)
        } 

        // caso ocorra o cadastro
        res.statusCode = 200
        res.setHeader("Content-Type", "text/plain")
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.json(retorno[0])
    });
});



// Servidor
app.listen(8080);