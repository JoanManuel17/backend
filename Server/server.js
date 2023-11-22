const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./database/config");
const cors = require("cors");

class Server {
  constructor() {
    //Crear el servidor de express
    this.app = express();
    this.port = process.env.PORT;

    this.pahts = {
      auth: "/api/auth",
      task: "/api/task",
    };

    //Conectar a base de datos
    this.connectToDB();
    //Middlewares
    this.addMiddlewares();
    //Rutas de mi aplicacion
    this.setRoutes();
  }

  //Metodo para conectar a la base de datos
  async connectToDB() {
    await dbConnection();
  }

  addMiddlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));
  }

  setRoutes() {
    //Rutas
    this.app.use(this.pahts.auth, require("../routes/auth"));
    this.app.use(this.pahts.task, require("../routes/task"));
  }

  listen() {
    //Escuchar peticiones en puerto 4000
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", process.env.PORT);
    });
  }
}

module.exports = Server;
