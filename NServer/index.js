const express = require("express");
const cors = require("cors");
const server = express();
const dadosTechs = require("../BdDJSON/celeste.json");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../Swagger/swagger.json");
server.use(cors());
server.use(express.json());
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.post("/techs", (req, res) => {
  const novaTech = req.body;
  novaTech.id = parseInt(novaTech.id);
  if (
    !novaTech.id ||
    !novaTech.titulo ||
    !novaTech.exemplo ||
    !novaTech.autor ||
    !novaTech.descricao
  ) {
    return res
      .status(400)
      .json({ mensagem: "Dados incompletos, tente novamente" });
  } else {
    const techExistente = dadosTechs.Tech.find(
      (tech) => tech.id === novaTech.id
    );
    if (techExistente) {
      return res.status(400).json({
        mensagem: "ID já existe, tente novamente com um ID diferente",
      });
    } else {
      dadosTechs.Tech.push(novaTech);
      salvarDadosTechs(dadosTechs);
      return res
        .status(201)
        .json({ mensagem: "Nova Tech cadastrada com sucesso!" });
    }
  }
});
server.get("/techs", (req, res) => {
  return res.json(dadosTechs.Tech);
});
server.put("/techs/:id", (req, res) => {
  const techId = parseInt(req.params.id);
  const atualizarTech = req.body;
  const idTech = dadosTechs.Tech.findIndex((m) => m.id === techId);
  if (idTech === -1) {
    return res.status(404).json({ mensagem: "Tech não encontrada :/" });
  } else {
    dadosTechs.Tech[idTech].id = atualizarTech.id || dadosTechs.Tech[idTech].id;
    dadosTechs.Tech[idTech].titulo =
      atualizarTech.titulo || dadosTechs.Tech[idTech].titulo;
    dadosTechs.Tech[idTech].exemplo =
      atualizarTech.exemplo || dadosTechs.Tech[idTech].exemplo;
    dadosTechs.Tech[idTech].autor =
      atualizarTech.autor || dadosTechs.Tech[idTech].autor;
    dadosTechs.Tech[idTech].descricao =
      atualizarTech.descricao || dadosTechs.Tech[idTech].descricao;
    salvarDadosTechs(dadosTechs);
    return res.json({ mensagem: "Tech atualizado com sucesso!" });
  }
});
server.delete("/techs/:id", (req, res) => {
  const techId = parseInt(req.params.id);
  dadosTechs.Tech = dadosTechs.Tech.filter((m) => m.id !== techId);
  salvarDadosTechs(dadosTechs);
  return res.status(200).json({ mensagem: "Tech excluído com sucesso" });
});
server.listen(3000, () => {
  console.log("O servidor está funcionando! :3");
});
function salvarDadosTechs() {
  fs.writeFileSync("./BdDJSON/celeste.json", JSON.stringify(dadosTechs));
}
module.exports = { server, salvarDadosTechs };
