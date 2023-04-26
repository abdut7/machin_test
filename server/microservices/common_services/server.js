const express = require('express')
const {
  intPort
} = require('./config/port')
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./router");
const {createMongoDbConnection} = require('../../libs/core/helpers')
const { initQuestens } = require('../../libs/core/helpers/init')
const objServiceApp = express();
try {
  createMongoDbConnection().then(()=>{
    /**Insert Questens into In memmory DB */
    initQuestens()
  });
  objServiceApp.use(cors());
  objServiceApp.use(bodyParser.json());
  objServiceApp.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  }));
  objServiceApp.use(function (err, req, res, next) {
    if (err instanceof SyntaxError && "body" in err) {
      res.status(400).send({
        errCommon: [{
          strMessage: "INVALID_JSON"
        }]
      });
    } else next();
  });
  objServiceApp.use("/", routes);
  objServiceApp.listen(intPort, function () {
    console.log('App is listening on port ' + intPort);
  });
} catch (error) {
  console.log(error);
}