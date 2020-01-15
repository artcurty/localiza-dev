const express = require("express");
const mongoose = require("mongoose");
const tokenAcess = require("./MongoTokenAcess");
const routes = require("./routes");

const app = express();

mongoose.connect(
  `mongodb+srv://ominiStackCurty:${tokenAcess}@cluster0-tk8jm.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(express.json());
app.use(routes);

app.listen(3333);
