import db from "../config/db";

async function getAll() {
  const sql = "select * from notas";
  const notas = await db.query(sql);
  return notas.rows;
}

async function getElementById(id) {
  const sql = `select * from notas where id = $1;`;
  const query = await db.query(sql, [id]);
  return query.rows;
}

async function create(dados) {
  const sql = 
  `insert into notas (id, nota, peso, id_disciplina, id_aluno, observacao, datahora) 
  values ($1, $2, $3, $4, $5, $6, $7) returning id;`;
  const { id, nota, peso, id_disciplina, id_aluno, observacao, datahora } = dados;
  const query = await db.query(sql, [id, nota, peso, id_disciplina, id_aluno, observacao, datahora]);
  return {
    message: "Insert criado com sucesso.",
    data: {
      id: query.rows[0].id,
    },
  };
}

//atualiza apenas os dados presentes, os que não vem não tem alteração
async function editNota(dados, idEdicao) {
  let fields = [];

  Object.keys(dados).forEach((e) => {
    if (e !== "id") {
      if (dados[e] === "" || dados[e] == null) {
        fields.push(`${e} = null`);
      } else {
        fields.push(`${e} = '${dados[e]}'`);
      }
    }
  });
  console.log(Object.keys(dados));
  fields = fields.join(", ");
  const sql = `update notas set ${fields} where id = ${idEdicao}`;

  const response = await db.query(sql);

  const msg =
    response.rowCount === 0
      ? `Não foi encontrado nenhum registro com o id ${idEdicao}`
      : `Registro ${idEdicao} alterado com sucesso!`;

  return { message: msg };
}

async function deleteNota(id) {
  const sql = `delete from notas where id = $1;`;
  const query = await db.query(sql, [id]);
  return query.rows;
}

export default {
  getAll,
  getElementById,
  create,
  editNota,
  deleteNota,
};
