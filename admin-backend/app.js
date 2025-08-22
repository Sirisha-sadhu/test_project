const express = require("express");
const http = require('http')
const compression = require("compression");
const MongoDataBaseConn = require("./src/config/db.config");
const { DEVELOPMENT_MODE } = require("./src/config/index.config");
const ratelimitConfig = require("./src/config/ratelimit.config");
const corsConfig = require("./src/config/cors.config");
const morganConfigFunction = require("./src/config/morgan.config");
const helmetConfig = require("./src/config/helmet.config");
const IndexRoutes = require("./src/routes/index.routes");
const errorHandling = require("./src/utils/errorHandling.util");
const { initSocket } = require("./src/config/socket.config");

const app = express();
const server = http.createServer(app);

//----------------------------------------
//------------ config --------------------
//----------------------------------------
// MongoDataBaseConn
initSocket(server);
MongoDataBaseConn();

if (DEVELOPMENT_MODE === "development") {
  app.use(morganConfigFunction());
}

app.use(helmetConfig);
app.use(ratelimitConfig);
app.use(compression({ level: 6 }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(corsConfig);


// Routes
app.use(IndexRoutes);

// // response for error message
app.use((err, req, res, next) => {
  errorHandling.handleMainErrorService(err, res);
});

module.exports = server;