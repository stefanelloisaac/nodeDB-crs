import db from "../config/db";

async function getAll() {
  const sql = "select * from disciplinas";
  const disciplinas = await db.query(sql);
  return disciplinas.rows;
}

async function getElementById(id) {
  const sql = `select * from disciplinas where id = $1;`;
  const query = await db.query(sql, [id]);
  return query.rows;
}

async function create(dados) {
  const sql = `insert into disciplinas (id, descricao, id_professor) values ($1, $2, $3) returning id;`;
  const { id, descricao, id_professor } = dados;
  const query = await db.query(sql, [id, descricao, id_professor]);
  return {
    message: "Insert criado com sucesso.",
    data: {
      id: query.rows[0].id,
    },
  };
}

//atualiza apenas os dados presentes, os que não vem não tem alteração
async function editDisciplina(dados, idEdicao) {
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
  const sql = `update disciplinas set ${fields} where id = ${idEdicao}`;

  const response = await db.query(sql);

  const msg =
    response.rowCount === 0
      ? `Não foi encontrado nenhum registro com o id ${idEdicao}`
      : `Registro ${idEdicao} alterado com sucesso!`;

  return { message: msg };
}

async function deleteDisciplina(id) {
  const sql = `delete from disciplinas where id = $1;`;
  const query = await db.query(sql, [id]);
  return query.rows;
}

export default {
  getAll,
  getElementById,
  create,
  editDisciplina,
  deleteDisciplina,
};
