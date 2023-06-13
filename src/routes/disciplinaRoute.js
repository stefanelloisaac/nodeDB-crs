import disciplinaController from "../controllers/disciplinaController";

export default (app) => {
  app.get("/disciplinas/get-all", disciplinaController.getAll);
  app.post("/disciplinas/create", disciplinaController.create);
  app.patch('/disciplinas/edit/:id', disciplinaController.edit);
  app.delete('/disciplinas/:id', disciplinaController.excluir)
};
