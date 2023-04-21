const express = require("express");
const cors = require("cors");
const dbConnection = require("./database/config");
require("dotenv").config();

const app = express();
//base de datos
dbConnection();

//cors
app.use(cors());

//directorio publico
app.use(express.static("public"));

//lectura y parseo del body
app.use(express.json());

//rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

//escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log("servidor corriendo en el puerto: " + process.env.PORT);
});
