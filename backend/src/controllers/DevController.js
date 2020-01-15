const axios = require("axios");
const dev = require("../models/Dev");
const queryToArray = require("../utils/ParseStringAsArray");

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
    return response.json(Dev);
  },

  //PUT
  async update() {
    //UPDATE
  },
  //DELETE
  async destroy() {
    //DELETE
  }
};
