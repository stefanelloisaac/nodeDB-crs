import dadoService from "../services/dadoService";

async function media(req, res) {
  try {
    if ((await dadoService.getElementById(req.params.id)).length) {
      const resposta = await dadoService.mediaDisciplina(req.params.id);
      return res.status(200).send({message: `Registro ${req.params.id} achado com sucesso!`, dados: resposta});
    } else {
      return res.status(400).send({message: `Não foi encontrado nenhum registro com o id ${req.params.id}`});
    }
  } catch (error) {
    return res.status(500).send({
      erro: error.message,
    });
  }
}

async function matriculas(req, res) {
  try {
    if ((await dadoService.getElementById(req.params.id)).length) {
      const resposta = await dadoService.alunoDisciplinas(req.params.id);
      return res.status(200).send({message: `Registro ${req.params.id} achado com sucesso!`, dados: resposta});
    } else {
      return res.status(400).send({message: `Não foi encontrado nenhum registro com o id ${req.params.id}`});
    }
  } catch (error) {
    return res.status(500).send({
      erro: error.message,
    });
  }
}

async function professores(req, res) {
  try {
    if ((await dadoService.getElementByIdProf(req.params.id)).length) {
      const resposta = await dadoService.professorMedia(req.params.id);
      return res.status(200).send({message: `Registro ${req.params.id} achado com sucesso!`, dados: resposta});
    } else {
      return res.status(400).send({message: `Não foi encontrado nenhum registro com o id ${req.params.id}`});
    }
  } catch (error) {
    return res.status(500).send({
      erro: error.message,
    });
  }
}

export default {
  media,
  matriculas,
  professores
};
