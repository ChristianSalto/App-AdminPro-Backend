require('dotenv').config();

const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require('cors');

// Crear servidor express
const app = express();

// Configurar CORS
app.use(cors());

// BD connection 
dbConnection();

// Rutas
app.get("/", (req, res) => {
  res.json({
    ok: true,
    msg: "Hola mundo",
  });
});

app.listen(process.env.PORT , () => {
  console.log("Servidor corriendo en puerto " + process.env.PORT);
});
