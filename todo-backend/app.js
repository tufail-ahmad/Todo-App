// Core Module
const path = require("path");

// External Module
const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const DB_PATH =
  "mongodb+srv://tufailahmad:ahmadashrafi@ahmadcluster.l8fjfsx.mongodb.net/todo?retryWrites=true&w=majority&appName=ahmadCluster";

// local modules
const errorsController = require("./controllers/errors");
const todoItemsRouter = require("./routes/todoItemsRouter");

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use("/api/todo", todoItemsRouter);

app.use(errorsController.pageNotFound);

const PORT = 3000;

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to Mongo");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo: ", err);
  });
