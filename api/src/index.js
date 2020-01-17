const express = require("express");
const mongoose = require("mongoose");
const tokenAcess = require("./MongoTokenAcess");
const http = require("http");
const routes = require("./routes");
const cors = require("cors");
const { setupWebsockets } = require("./websocket");

const app = express();
const server = http.Server(app);

setupWebsockets(server);

mongoose.connect(
  `mongodb+srv://ominiStackCurty:${tokenAcess}@cluster0-tk8jm.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
