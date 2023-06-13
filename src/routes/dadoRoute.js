import dadoController from "../controllers/dadoController";

export default (app) => {
  app.get("/dados/media/:id", dadoController.media);
  app.get("/dados/matriculas/:id", dadoController.matriculas);
  app.get("/dados/professores/:id", dadoController.professores);
};
