const db = require('../database/connection');

// --- Function para formato data do brasil (DD/MM/AAAA) ---
const formatarDataPtBR = (dataISO) => {
    if (!dataISO) return null;
    const data = new Date(dataISO);
    
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0'); 
    const ano = data.getUTCFullYear();
    
    return `${dia}/${mes}/${ano}`;
};

const formatarDataHoraPtBR = (dataISO) => {
    if (!dataISO) return null;
    const data = new Date(dataISO);
    // Transforma para string brasileira considerando o fuso horário
    return data.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
};

module.exports = {

    //Cadastro dos alunos
   async cadastrarAluno(request, response) {
        try {
            // Agora recebemos também o endereço
            const { nome, data_nascimento, endereco, sala } = request.body;

            if (!sala || !['a', 'b', 'c'].includes(sala.toLowerCase())) {
                return response.status(400).json({ sucesso: false, mensagem: 'Sala inválida.', dados: null });
            }

            const tabela = `alunos_sala_${sala.toLowerCase()}`;
            
            // SQL atualizado com endereco
            const sql = `INSERT INTO ${tabela} (nome, data_nascimento, endereco) VALUES (?, ?, ?)`;
            const values = [nome, data_nascimento, endereco];

            const execucao = await db.query(sql, values);
            const idNovoAluno = execucao[0].insertId;

            return response.status(201).json({
                sucesso: true,
                mensagem: `Aluno cadastrado com sucesso na Sala ${sala.toUpperCase()}.`,
                dados: { id: idNovoAluno, nome, data_nascimento, endereco }
            });
        } catch (error) {
            return response.status(500).json({ sucesso: false, mensagem: 'Erro ao cadastrar.', dados: error.message });
        }
    }, 

    //Mostrar informações do aluno
    async visualizarAluno(request, response) {
        try {
            const { sala, id } = request.params;
            const termo = sala.toLowerCase();

            if (!['a', 'b', 'c'].includes(termo)) {
                return response.status(400).json({ sucesso: false, mensagem: 'Sala inválida.', dados: null });
            }

            const tabela = `alunos_sala_${termo}`;
            const sql = `SELECT * FROM ${tabela} WHERE id = ?`;
            
            const [rows] = await db.query(sql, [id]);

            if (rows.length === 0) {
                return response.status(404).json({ sucesso: false, mensagem: 'Aluno não encontrado.', dados: null });
            }

           
            const aluno = rows[0];
            aluno.data_nascimento = formatarDataPtBR(aluno.data_nascimento);

            if(aluno.data_inclusao) aluno.data_inclusao = new Date(aluno.data_inclusao).toLocaleString('pt-BR');

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Aluno encontrado.',
                dados: aluno
            });

        } catch (error) {
            return response.status(500).json({ sucesso: false, mensagem: 'Erro ao buscar aluno.', dados: error.message });
        }
    },

    //Editar informações do aluno
    async editarAluno(request, response) {
        try {
            const { sala, id } = request.params;
            const { nome, data_nascimento, endereco } = request.body;
            const termo = sala.toLowerCase();

            if (!['a', 'b', 'c'].includes(termo)) {
                return response.status(400).json({ sucesso: false, mensagem: 'Sala inválida.', dados: null });
            }

            const tabela = `alunos_sala_${termo}`;

            // Busca os dados do aluno
            const [rows] = await db.query(`SELECT * FROM ${tabela} WHERE id = ?`, [id]);

            if (rows.length === 0) {
                return response.status(404).json({ sucesso: false, mensagem: 'Aluno não encontrado para edição.', dados: null });
            }

            const alunoAtual = rows[0];

            // função para caso nao mudar alguma coisa no editar e manter a mesma coisa que estava sem deixar o campo "null".
            const novoNome = nome ? nome : alunoAtual.nome;
            const novaData = data_nascimento ? data_nascimento : alunoAtual.data_nascimento;
            const novoEndereco = endereco ? endereco : alunoAtual.endereco;

            // Atualizar no banco com os dados definitivos
            const sql = `UPDATE ${tabela} SET nome = ?, data_nascimento = ?, endereco = ? WHERE id = ?`;
            const values = [novoNome, novaData, novoEndereco, id];

            await db.query(sql, values);

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Dados do aluno atualizados com sucesso.',
                dados: { 
                    id, 
                    nome: novoNome, 
                    data_nascimento: novaData, 
                    endereco: novoEndereco 
                }
            });

        } catch (error) {
            return response.status(500).json({ sucesso: false, mensagem: 'Erro ao editar aluno.', dados: error.message });
        }
    },

    //Remover Aluno
    async removerAluno(request, response) {
        try {
            const { sala, id } = request.params;
            const termo = sala.toLowerCase();

            if (!['a', 'b', 'c'].includes(termo)) {
                return response.status(400).json({ sucesso: false, mensagem: 'Sala inválida.', dados: null });
            }

            const tabela = `alunos_sala_${termo}`;
            const sql = `DELETE FROM ${tabela} WHERE id = ?`;

            const [result] = await db.query(sql, [id]);

            if (result.affectedRows === 0) {
                return response.status(404).json({ sucesso: false, mensagem: 'Aluno não encontrado.', dados: null });
            }

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Aluno removido com sucesso.',
                dados: { id_removido: id }
            });

        } catch (error) {
            return response.status(500).json({ sucesso: false, mensagem: 'Erro ao remover aluno.', dados: error.message });
        }
    },

    //Listagem completa dos alunos de cada Sala
    async listarPorSala(request, response) {
        try {
            const { sala } = request.params;

            if (!['a', 'b', 'c'].includes(sala.toLowerCase())) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Sala inválida. Escolha entre A, B ou C.',
                    dados: null
                });
            }

            const tabela = `alunos_sala_${sala.toLowerCase()}`;
            const sql = `SELECT * FROM ${tabela}`;
            
            const alunos = await db.query(sql);
            const dadosBrutos = alunos[0];

            //formatação para mostrar a data dia/mes/ano
            const dadosFormatados = dadosBrutos.map(aluno => {
                return {
                    ...aluno,
                    data_nascimento: formatarDataPtBR(aluno.data_nascimento),
                    data_inclusao: formatarDataHoraPtBR(aluno.data_inclusao) 
                };
            });

            return response.status(200).json({
                sucesso: true,
                mensagem: `Lista de alunos da Sala ${sala.toUpperCase()}.`,
                dados: dadosFormatados,
                nItens: dadosFormatados.length
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

     //Busca por sobrenome ou nome alves na sala 
     async buscarAlves(request, response) {
        try {
            
            const { sala } = request.params;
            const termo = sala ? sala.toLowerCase() : '';

            if (!['a', 'b', 'c', 'todas'].includes(termo)) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Opção inválida. Escolha: a, b, c ou todas.',
                    dados: null
                });
            }

            let sql = '';
            let mensagem = '';

            //Busca geral em todas as salas
            if (termo === 'todas') {
                sql = `
                    SELECT nome, 'Sala A' as sala_origem FROM alunos_sala_a WHERE nome LIKE '%Alves%'
                    UNION ALL
                    SELECT nome, 'Sala B' as sala_origem FROM alunos_sala_b WHERE nome LIKE '%Alves%'
                    UNION ALL
                    SELECT nome, 'Sala C' as sala_origem FROM alunos_sala_c WHERE nome LIKE '%Alves%'
                    ORDER BY nome ASC
                `;
                mensagem = 'Busca por sobrenome Alves em todas as salas realizada com sucesso.';
            
            } else {
                // Busca em uma sala específica
                const tabela = `alunos_sala_${termo}`;
                
                sql = `SELECT nome, 'Sala ${termo.toUpperCase()}' AS sala_origem FROM ${tabela} WHERE nome LIKE '%Alves%' ORDER BY nome ASC`;
                mensagem = `Busca por sobrenome Alves na Sala ${termo.toUpperCase()} realizada com sucesso.`;
            }

            const alunos = await db.query(sql);
            const dados = alunos[0];

            return response.status(200).json({
                sucesso: true,
                mensagem: mensagem,
                dados: dados,
                nItens: dados.length
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    //Busca dos alunos nascidos antes de 2013
   async buscarNascidosAntes2013(request, response) {
        try {
            const { sala } = request.params; 
            const termo = sala.toLowerCase();
            
            let sql = '';
            let mensagem = '';

            if (['a', 'b', 'c'].includes(termo)) {
                sql = `SELECT * FROM alunos_sala_${termo} WHERE data_nascimento < '2013-01-01'`;
                mensagem = `Busca por alunos nascidos antes de 2013 da sala ${termo.toUpperCase()}.`;
            } else if (termo === 'todas') {
                sql = `
                    SELECT *, 'Sala A' as origem FROM alunos_sala_a WHERE data_nascimento < '2013-01-01'
                    UNION ALL
                    SELECT *, 'Sala B' as origem FROM alunos_sala_b WHERE data_nascimento < '2013-01-01'
                    UNION ALL
                    SELECT *, 'Sala C' as origem FROM alunos_sala_c WHERE data_nascimento < '2013-01-01';
                `;
                mensagem = 'Busca por alunos nascidos antes de 2013 de TODAS as salas.';
            } else {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Parâmetro inválido. Use: a, b, c ou todas.',
                    dados: null
                });
            }

            const alunos = await db.query(sql);
            const dadosBrutos = alunos ? alunos[0] : [];

            
            const dadosFormatados = dadosBrutos.map(aluno => {
                return {
                    ...aluno,
                    data_nascimento: formatarDataPtBR(aluno.data_nascimento),
                    data_inclusao: formatarDataHoraPtBR(aluno.data_inclusao)
                };
            });

            return response.status(200).json({
                sucesso: true,
                mensagem: mensagem,
                dados: dadosFormatados,
                nItens: dadosFormatados.length
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    //Atualizar data para o dia de hoje
    async atualizarDatas(request, response) {
        try {
            // Pega o parâmetro da URL (a, b, c ou todas)
            const { sala } = request.params;
            const termo = sala ? sala.toLowerCase() : '';

            // Validação
            if (!['a', 'b', 'c', 'todas'].includes(termo)) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Opção inválida. Escolha: a, b, c ou todas.',
                    dados: null
                });
            }

            // Desativa trava de segurança
            await db.query("SET SQL_SAFE_UPDATES = 0;");
            
            let totalAfetados = 0;
            let mensagem = '';

            if (termo === 'todas') {
                // Atualiza TODAS as salas
                const updateA = await db.query("UPDATE alunos_sala_a SET data_nascimento = CURRENT_DATE()");
                const updateB = await db.query("UPDATE alunos_sala_b SET data_nascimento = CURRENT_DATE()");
                const updateC = await db.query("UPDATE alunos_sala_c SET data_nascimento = CURRENT_DATE()");
                
                totalAfetados = updateA[0].affectedRows + updateB[0].affectedRows + updateC[0].affectedRows;
                mensagem = 'Datas de nascimento de TODAS as salas atualizadas para hoje.';
            
            } else {
                // Atualiza uma sala específica 
                const tabela = `alunos_sala_${termo}`;
                const update = await db.query(`UPDATE ${tabela} SET data_nascimento = CURRENT_DATE()`);
                
                totalAfetados = update[0].affectedRows;
                mensagem = `Datas de nascimento da Sala ${termo.toUpperCase()} atualizadas para hoje.`;
            }
            
            // Reativa trava
            await db.query("SET SQL_SAFE_UPDATES = 1;");

            return response.status(200).json({
                sucesso: true,
                mensagem: mensagem,
                dados: { linhasAfetadas: totalAfetados }
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    //Deleta os numero 13 a 22 da sala escolhida
   async deletarIntervalo(request, response) {
        try {
            const { sala } = request.params;
            const termo = sala ? sala.toLowerCase() : '';

            if (!['a', 'b', 'c'].includes(termo)) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Sala inválida. Escolha apenas: a, b ou c.',
                    dados: null
                });
            }

            await db.query("SET SQL_SAFE_UPDATES = 0;");

            const tabela = `alunos_sala_${termo}`;
            
            const resultado = await db.query(`DELETE FROM ${tabela} WHERE id BETWEEN 13 AND 22`);

            await db.query("SET SQL_SAFE_UPDATES = 1;");

            return response.status(200).json({
                sucesso: true,
                mensagem: `Alunos com ID entre 13 e 22 excluídos com sucesso da Sala ${termo.toUpperCase()}.`,
                dados: { linhasExcluidas: resultado[0].affectedRows }
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    // Reseta a sala escolhida
    async resetarTabela(request, response) {
        try {
            const { sala } = request.params;
            const termo = sala ? sala.toLowerCase() : '';

            if (!['a', 'b', 'c', 'todas'].includes(termo)) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Opção inválida. Escolha: a, b, c ou todas.',
                    dados: null
                });
            }
            
            //desliga a trava de segurança
            await db.query("SET SQL_SAFE_UPDATES = 0;");

            let mensagem = '';

            if (termo === 'todas') {
                // Reseta todas as tabelas
                await db.query("TRUNCATE TABLE alunos_sala_a");
                await db.query("TRUNCATE TABLE alunos_sala_b");
                await db.query("TRUNCATE TABLE alunos_sala_c");
                
                mensagem = 'Todas as tabelas foram resetadas e os IDs voltaram a ser 1.';
            
            } else {
                // Reseta uma tabela específica
                const tabela = `alunos_sala_${termo}`;
                await db.query(`TRUNCATE TABLE ${tabela}`);
                
                mensagem = `Tabela da Sala ${termo.toUpperCase()} resetada com sucesso (IDs zerados).`;
            }

            // 4. Reativa a trava
            await db.query("SET SQL_SAFE_UPDATES = 1;");

            return response.status(200).json({
                sucesso: true,
                mensagem: mensagem,
                dados: null 
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao resetar tabela(s).',
                dados: error.message
            });
        }
    },

    //Pesquisa por nome do aluno
    async buscarPorNome(request, response) {
        try {
            // Pegamos a sala e o nome digitado
            const { sala, nome } = request.params;
            const termoSala = sala ? sala.toLowerCase() : '';
            const termoBusca = `%${nome}%`; // Adiciona % para buscar em qualquer parte do texto

            // Validação da sala
            if (!['a', 'b', 'c', 'todas'].includes(termoSala)) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Sala inválida. Escolha: a, b, c ou todas.',
                    dados: null
                });
            }

            let sql = '';
            let values = []; // Array para substituir os "?" no SQL com segurança

            if (termoSala === 'todas') {
                sql = `
                    SELECT *, 'Sala A' as origem FROM alunos_sala_a WHERE nome LIKE ?
                    UNION ALL
                    SELECT *, 'Sala B' as origem FROM alunos_sala_b WHERE nome LIKE ?
                    UNION ALL
                    SELECT *, 'Sala C' as origem FROM alunos_sala_c WHERE nome LIKE ?
                    ORDER BY nome ASC
                `;
                // O termoBusca repete 3 vezes pq temos 3 "?" no SQL acima
                values = [termoBusca, termoBusca, termoBusca];
            
            } else {
                const tabela = `alunos_sala_${termoSala}`;
                sql = `SELECT *, 'Sala ${termoSala.toUpperCase()}' as origem FROM ${tabela} WHERE nome LIKE ? ORDER BY nome ASC`;
                values = [termoBusca];
            }

            const alunos = await db.query(sql, values);
            const dadosBrutos = alunos[0];

            // Formatação das datas (Nascimento e Inclusão)
            const dadosFormatados = dadosBrutos.map(aluno => ({
                ...aluno,
                data_nascimento: formatarDataPtBR(aluno.data_nascimento),
                data_inclusao: formatarDataHoraPtBR(aluno.data_inclusao)
            }));

            return response.status(200).json({
                sucesso: true,
                mensagem: `Busca por "${nome}" realizada com sucesso.`,
                dados: dadosFormatados,
                nItens: dadosFormatados.length
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na busca.',
                dados: error.message
            });
        }
    },

};

