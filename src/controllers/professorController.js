import professorService from "../services/professorService";

async function getAll(_, res) {
  try {
    const resposta = await professorService.getAll();
    return res.status(200).send({
      message: "Busca efetuada com sucesso.",
      data: resposta,
    });
  } catch (error) {
    return res.status(500).send({
      erro: error.message,
    });
  }
}

async function create(req, res) {
  try {
    const resposta = await professorService.create(req.body);
    return res.status(200).send(resposta);
  } catch (error) {
    return res.status(500).send({
      erro: error.message,
    });
  }
}

async function edit(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        message: "Campo inválido.",
      });
    }
    const resposta = await professorService.editProfessor(req.body, id);
    return res.status(200).send(resposta);
  } catch (error) {
    return res.status(500).send({
      erro: error.message,
    });
  }
}

async function excluir(req, res) {
  try {
    if ((await professorService.getElementById(req.params.id)).length) {
      await professorService.deleteProfessor(req.params.id);
      res.status(200).send({message: `Registro ${req.params.id} apagado com sucesso!`});
    } else {
      res.status(400).send({message: `Não foi encontrado nenhum registro com o id ${req.params.id}`});
    }
  } catch (error) {
    return res.status(500).send({
      erro: error.message,
    });
  }
}

export default {
  getAll,
  create,
  edit,
  excluir,
};
