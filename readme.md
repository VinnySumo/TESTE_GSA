# TESTE_GSA_BACKEND

# 🗄️ API Gerenciador de Alunos (Backend)

API REST desenvolvida em **Node.js** responsável por gerenciar a comunicação entre o Frontend e o banco de dados **MySQL**, processando as regras de negócio e as queries específicas solicitadas no teste prático.

## 🚀 Tecnologias Utilizadas

- **Node.js** (Runtime JavaScript)
- **Express** (Framework para API)
- **MySQL2** (Driver de conexão com suporte a Promises)
- **Cors** (Gerenciamento de requisições externas)

## 🔌 Endpoints da API

A API roda localmente na porta **3333** (`http://localhost:3333`) e organiza as rotas focadas nas operações por sala.

### 🏥 Utilitários
- `GET /health`: Verifica se a API está online e respondendo.

### 📝 Rotas Gerais (CRUD)
- `GET /sala/:sala`: Lista todos os alunos da sala escolhida (#teste 1).
- `GET /sala/:sala/:id`: Visualiza um aluno específico.
- `GET /sala/busca/:sala/:nome`: Busca alunos por nome.
- `POST /sala/cadastrar`: Cadastra um novo aluno (#teste 5).
- `PUT /sala/:sala/:id`: Edita as informações de um aluno.
- `DELETE /sala/:sala/:id`: Remove um aluno específico.

### 🧪 Rotas Específicas (Teste Lógico)
Estas rotas foram criadas para atender aos requisitos específicos do PDF do teste:

- `GET /sala/buscaAlves/:sala`: Lista alunos com sobrenome **Alves** (#teste 2).
- `GET /sala/nascimento/:sala`: Lista alunos nascidos **antes de 2013** (#teste 3).
- `PATCH /sala/atualizarData/:sala`: Atualiza a data de nascimento de todos para o dia atual (#teste 4).
- `DELETE /sala/apagarAluno/:sala`: Apaga alunos no intervalo de IDs **13 ao 22** (#teste 6).
- `DELETE /sala/resetar/:sala`: Reseta/Limpa a tabela da sala escolhida.

## 📂 Configuração do Banco de Dados

O projeto utiliza o banco de dados `banco_gsa_teste` com tabelas separadas para cada sala (`alunos_sala_a`, `alunos_sala_b`, `alunos_sala_c`).

As credenciais de conexão estão configuradas para uso local:
- **Host:** localhost
- **User:** root
- **Port:** 3306
- **Port:** (Senha que usa no seu banco de dados)

> 💡 **Dica:** O script SQL para criar e popular o banco está na pasta `/database` deste projeto. Importe-o no seu Workbench, o script ja esta programado para criar o banco de dados junto.

## 🔧 Como Rodar o Projeto

1. **Pré-requisitos:**
   - Tenha o **Node.js** instalado.
   - Tenha o **MySQL** rodando e o banco `banco_gsa` criado.

2. **Instalação:**
   Clone este repositório, acesse a pasta e instale as dependências:
   npm install

3. **Execução:**
   Para iniciar digite:
   npm start ou npm run dev

4. **Conexão:**
   O servidor iniciará na porta 3333 e exibirá a mensagem:

   "Servidor iniciado na porta 3333"

 Desenvolvido por [Vynicios Raphael] #VinnySumo
