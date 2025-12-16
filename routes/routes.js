const express = require("express");
const router = express.Router();

// referência a controllers que serão utilizados nas rotas
const AlunoController = require('../controllers/Alunos')

 // -- Definição das rotas -- 

 //Alunos

 router.get("/alunos/sala/:sala",AlunoController.listarPorSala); //Listar os alunos da sala

 router.get("/alunos/salaA/alves",AlunoController.buscarAlvesSalaA); //Listar os alunos com nome ou sobrenome alves na sala A

 router.get("/alunos/salaB/alves",AlunoController.buscarAlvesSalaB); //Listar os alunos com nome ou sobrenome alves na sala B

 router.get("/alunos/salaC/alves",AlunoController.buscarAlvesSalaC); //Listar os alunos com nome ou sobrenome alves na sala C

  router.get("/alunos/busca/alves",AlunoController.buscarAlves); //Listar os alunos com nome ou sobrenome alves em todas as salas
 
module.exports = router;