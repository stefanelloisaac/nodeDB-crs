import professorController from "../controllers/professorController";

export default (app) => {
  app.get("/professores/get-all", professorController.getAll);
  app.post("/professores/create", professorController.create);
  app.patch('/professores/edit/:id', professorController.edit);
  app.delete('/professores/:id', professorController.excluir)
};
