import notaController from "../controllers/notaController";

export default (app) => {
  app.get("/notas/get-all", notaController.getAll);
  app.post("/notas/create", notaController.create);
  app.patch('/notas/edit/:id', notaController.edit);
  app.delete('/notas/:id', notaController.excluir)
};
