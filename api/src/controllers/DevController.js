const axios = require("axios");
const dev = require("../models/Dev");
const queryToArray = require("../utils/ParseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");

module.exports = {
  //Lista devs
  async index(request, response) {
    const devs = await dev.find();

    return response.json(devs);
  },

  //Cadastra devs
  async store(request, response) {
    const { github_username, techs, longitude, latitude } = request.body;

    let Dev = await dev.findOne({ github_username });

    if (!Dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = apiResponse.data;
      const techsArray = queryToArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      Dev = await dev.create({
        name,
        github_username,
        bio,
        avatar_url,
        techs: techsArray,
        location
      });
    }

    // Filtrar conexões que estão há no maximo 10km de distância
    // Conter pelo menos uma das tecnologias filtradas
    const sendSocketMessageTo = findConnections(
      {
        latitude,
        longitude
      },
      techs
    );

    sendMessage(sendSocketMessageTo, "new-dev", Dev);

    return response.json(Dev);
  },

  //PUT
  async update(request, response) {
    //UPDATE
    const { github_username, techs } = request.body;
    const techsArray = queryToArray(techs);
    const refresh = await dev.update(
      { github_username },
      { $set: { techs: techsArray } }
    );

    return response.json(refresh);
  },

  //DELETE
  async destroy(request, response) {
    const { github_username } = request.query;

    const dropDev = await dev.deleteOne({ github_username: github_username });

    return response.json(dropDev);
  }
};
