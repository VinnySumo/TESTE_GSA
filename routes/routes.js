const express = require("express");
const router = express.Router();

// referência a controllers que serão utilizados nas rotas
const AlunoController = require('../controllers/Alunos')

 // -- Definição das rotas -- 

 //Alunos

 router.post("/alunos/cadastrar" ,AlunoController.cadastrarAluno) // Cadastro dos alunos #teste 5

 router.get("/alunos/sala/:sala",AlunoController.listarPorSala); //Listar os alunos da sala escolhida #teste 1

 router.get("/alunos/buscaAlves/:sala",AlunoController.buscarAlves); //Listar os alunos com nome ou sobrenome alves da sala escolhida #teste 2

 router.get("/alunos/nascimento/:sala",AlunoController.buscarNascidosAntes2013); //Busca dos alunos nascidos antes de 2013 da sala escolhida #teste 3
 
 router.patch("/alunos/atualizarData/:sala",AlunoController.atualizarDatas); //Atualizar as datas dos alunos para o dia atual #teste 4

 router.delete("/alunos/apagarAluno/:sala",AlunoController.deletarIntervalo); //Apagar os alunos 13 ao 22 da sala escolhida #teste 6

 
module.exports = router;