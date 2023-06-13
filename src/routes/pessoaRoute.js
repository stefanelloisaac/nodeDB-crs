import pessoaController from "../controllers/pessoaController";

export default (app) => {
  app.get("/pessoas/get-all", pessoaController.getAll);
  app.post("/pessoas/create", pessoaController.create);
  app.patch('/pessoas/edit/:id', pessoaController.edit);
  app.delete('/pessoas/:id', pessoaController.excluir)
};
