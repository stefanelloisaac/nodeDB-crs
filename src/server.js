import 'dotenv/config';
import express from "express";
import Routes from "./routes";

const porta = process.env.PORTA_API;
const app = express();

app.use(express.json());
Routes(app);

app.use((req, res) => {
  return res.status(404).send('Não encontrada.')
})

app.listen(porta, () =>
  console.log(`Servidor rodando no link http://localhost:${porta}`)
);
