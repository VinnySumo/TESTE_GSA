const db = require('../database/connection');

module.exports = {
    async listarPorSala(request, response) {
        try {
            const { sala } = request.params;

            // Validação básica para evitar SQL Injection na concatenação da tabela
            if (!['a', 'b', 'c'].includes(sala.toLowerCase())) {
                return response.status(400).json({
                    sucesso: false,
                    mensagem: 'Sala inválida. Escolha entre A, B ou C.',
                    dados: null
                });
            }

            const tabela = `alunos_sala_${sala.toLowerCase()}`;
            const sql = `SELECT id, nome, data_nascimento FROM ${tabela}`;
            
            const alunos = await db.query(sql);
            const nItens = alunos[0].length;

            return response.status(200).json({
                sucesso: true,
                mensagem: `Lista de alunos da Sala ${sala.toUpperCase()}.`,
                dados: alunos[0],
                nItens
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

     async buscarAlvesSalaA(request, response) {
        try {
            const sql = `
               SELECT nome, 'Sala A' AS sala_origem 
                    FROM alunos_sala_a 
                WHERE nome LIKE '%Alves%'
            `;
            
            const alunos = await db.query(sql);
            const nItens = alunos[0].length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Busca por sobrenome Alves na sala A realizada com sucesso.',
                dados: alunos[0],
                nItens
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async buscarAlvesSalaB(request, response) {
        try {
            const sql = `
               SELECT nome, 'Sala B' AS sala_origem 
                    FROM alunos_sala_b
                WHERE nome LIKE '%Alves%'
            `;
            
            const alunos = await db.query(sql);
            const nItens = alunos[0].length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Busca por sobrenome Alves na sala B realizada com sucesso.',
                dados: alunos[0],
                nItens
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

      async buscarAlvesSalaC(request, response) {
        try {
            const sql = `
               SELECT nome, 'Sala C' AS sala_origem 
                    FROM alunos_sala_C
                WHERE nome LIKE '%Alves%'
            `;
            
            const alunos = await db.query(sql);
            const nItens = alunos[0].length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Busca por sobrenome Alves na sala C realizada com sucesso.',
                dados: alunos[0],
                nItens
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async buscarAlves(request, response) {
        try {
            const sql = `
                SELECT nome, 'Sala A' as sala_origem FROM alunos_sala_a WHERE nome LIKE '%Alves%'
                UNION ALL
                SELECT nome, 'Sala B' as sala_origem FROM alunos_sala_b WHERE nome LIKE '%Alves%'
                UNION ALL
                SELECT nome, 'Sala C' as sala_origem FROM alunos_sala_c WHERE nome LIKE '%Alves%'
                ORDER BY nome ASC
            `;
            
            const alunos = await db.query(sql);
            const nItens = alunos[0].length;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Busca por sobrenome Alves de todas as salas realizada com sucesso.',
                dados: alunos[0],
                nItens
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    },

    async atualizarDatas(request, response) {
        try {
            // Desativa trava de segurança
            await db.query("SET SQL_SAFE_UPDATES = 0;");
            
            // Executa updates
            const updateA = await db.query("UPDATE alunos_sala_a SET data_nascimento = CURDATE()");
            const updateB = await db.query("UPDATE alunos_sala_b SET data_nascimento = CURDATE()");
            const updateC = await db.query("UPDATE alunos_sala_c SET data_nascimento = CURDATE()");
            
            // Reativa trava
            await db.query("SET SQL_SAFE_UPDATES = 1;");

            // Soma o total de linhas afetadas nas 3 tabelas
            const totalAfetados = updateA[0].affectedRows + updateB[0].affectedRows + updateC[0].affectedRows;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Datas de nascimento atualizadas para hoje com sucesso.',
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

    async deletarIntervalo(request, response) {
        try {
            await db.query("SET SQL_SAFE_UPDATES = 0;");

            const deleteA = await db.query("DELETE FROM alunos_sala_a WHERE id BETWEEN 13 AND 22");
            const deleteB = await db.query("DELETE FROM alunos_sala_b WHERE id BETWEEN 13 AND 22");
            const deleteC = await db.query("DELETE FROM alunos_sala_c WHERE id BETWEEN 13 AND 22");

            await db.query("SET SQL_SAFE_UPDATES = 1;");

            const totalExcluidos = deleteA[0].affectedRows + deleteB[0].affectedRows + deleteC[0].affectedRows;

            return response.status(200).json({
                sucesso: true,
                mensagem: 'Alunos com ID entre 13 e 22 excluídos com sucesso.',
                dados: { linhasExcluidas: totalExcluidos }
            });

        } catch (error) {
            return response.status(500).json({
                sucesso: false,
                mensagem: 'Erro na requisição.',
                dados: error.message
            });
        }
    }
};