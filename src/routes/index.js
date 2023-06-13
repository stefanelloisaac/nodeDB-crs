import alunoRoute from "./alunoRoute";
import dadoRoute from "./dadoRoute";
import disciplinaRoute from "./disciplinaRoute";
import notaRoute from "./notaRoute";
import pessoaRoute from "./pessoaRoute";
import professorRoute from "./professorRoute";

function Routes(app) {
  pessoaRoute(app);
  professorRoute(app);
  alunoRoute(app);
  disciplinaRoute(app);
  notaRoute(app);
  dadoRoute(app);
}

export default Routes;
