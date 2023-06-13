import alunoController from "../controllers/alunoController";

export default (app) => {
  app.get("/alunos/get-all", alunoController.getAll);
  app.post("/alunos/create", alunoController.create);
  app.patch('/alunos/edit/:id', alunoController.edit);
  app.delete('/alunos/:id', alunoController.excluir)
};
