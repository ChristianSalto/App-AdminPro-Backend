require("dotenv").config();

const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require("cors");

// Crear servidor express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use( express.json() );

// BD connection
dbConnection();

// Rutas
app.use("/api/users", require("./routes/users"));
app.use("/api/login", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto " + process.env.PORT);
});
