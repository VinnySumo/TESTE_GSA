const express = require("express");
const router = express.Router();

// referência a controllers que serão utilizados nas rotas
const AlunoController = require('../controllers/Alunos')

 // -- Definição das rotas -- 

 //Alunos

 router.post("/alunos/cadastrar" ,AlunoController.cadastrarAluno) // Cadastro dos alunos

 router.get("/alunos/sala/:sala",AlunoController.listarPorSala); //Listar os alunos da sala escolhida

 router.get("/alunos/salaA/alves",AlunoController.buscarAlvesSalaA); //Listar os alunos com nome ou sobrenome alves na sala A

 router.get("/alunos/salaB/alves",AlunoController.buscarAlvesSalaB); //Listar os alunos com nome ou sobrenome alves na sala B

 router.get("/alunos/salaC/alves",AlunoController.buscarAlvesSalaC); //Listar os alunos com nome ou sobrenome alves na sala C

 router.get("/alunos/busca/alves",AlunoController.buscarAlves); //Listar os alunos com nome ou sobrenome alves em todas as salas

 router.get("/alunos/nascimento/:sala",AlunoController.buscarNascidosAntes2013); //Busca dos alunos nascidos antes de 2013 escolha por sala ou todas as salas
 
 router.patch("/alunos/atualizarData/:sala",AlunoController.atualizarDatas); //Atualizar as datas dos alunos para o dia de hoje

 router.delete("/alunos/apagarAluno/:sala",AlunoController.deletarIntervalo); //Apagar os alunos 13 ao 22 da sala escolhida

 
module.exports = router;