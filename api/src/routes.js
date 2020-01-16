const { Router } = require("express");
const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

// Métodos HTTP: GET,POST,PUT, DELETE
// Tipos de parâmetros:
// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recuso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

const routes = Router();
//GET Busca
routes.get("/search", SearchController.index);
//GET
routes.get("/devs", DevController.index);
//POST
routes.post("/devs", DevController.store);
//DELETE
routes.delete("/devs", DevController.destroy);
//PUT
routes.put("/devs", DevController.update);

module.exports = routes;
