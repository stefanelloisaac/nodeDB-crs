import db from "../config/db";

async function getElementById(id) {
  const sql = 
  `select * 
  from alunos
  join pessoas on (alunos.id_pessoa = pessoas.id)
  where pessoas.id = $1;`;
  const query = await db.query(sql, [id]);
  return query.rows;
}

async function getElementByIdProf(id) {
  const sql = 
  `select * 
  from professores
  join pessoas on (professores.id_pessoa = pessoas.id)
  where pessoas.id = $1;`;
  const query = await db.query(sql, [id]);
  return query.rows;
}

async function mediaDisciplina(id) {
  const sql = 
  `select
	  pessoas.nome,
	  alunos.matricula,
	  sum(notas.nota*(notas.peso/10)) as media,
	  disciplinas.descricao
  from
	  alunos
  join
	  pessoas on (pessoas.id = alunos.id_pessoa)
  join
	  notas on (alunos.id = notas.id_aluno)
  join
	  disciplinas on (notas.id_disciplina = disciplinas.id)
  where
    pessoas.id = $1
  group by pessoas.nome, alunos.matricula, disciplinas.descricao;`;
  const dados = await db.query(sql, [id]);
  return dados.rows;
  
}

async function alunoDisciplinas(id) {
  const sql = 
  `select 
	  p.nome,
	  array_agg (jsonb_build_object ('nome', d.descricao)) as disciplinas
  from 
    alunos as a
  join notas as n on n.id_aluno = a.id
  join disciplinas as d on d.id = n.id_disciplina
  join pessoas as p on (p.id = a.id_pessoa)
  where p.id = $1
  group by p.nome;`;
  const query = await db.query(sql, [id]);
  return query.rows;
}

async function professorMedia(id) {
  const sql = 
  `select 
	  p.nome,
	  a.id, 
	  sum(n.nota*(n.peso/10)) as media,
	  d.descricao
  from alunos as a
  join notas as n on n.id_aluno = a.id
  join disciplinas as d on d.id = n.id_disciplina
  join professores as t on d.id_professor = t.id
  join pessoas as p on p.id = t.id_pessoa
  where p.id = $1
  group by p.nome, a.id, d.descricao;`;
  const query = await db.query(sql, [id]);
  return query.rows;
}


export default {
  mediaDisciplina,
  alunoDisciplinas,
  professorMedia,
  getElementById,
  getElementByIdProf
};
