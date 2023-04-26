const moment = require('moment-timezone')
const errHandler =require("./errHandler");
const makeController = (controller)=> {
  return (req, res) => {
    try {
      const httpRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip,
        strEncryptedToken: req.strEncryptedToken,
        intUserId: req.intUserId,
        strUserType:req.strUserType,
        method: req.method,
        timReceived: moment().tz("Asia/Kolkata").format('DD/MM/YYYY hh:m:s a'),
        path: req.originalUrl,
        strAudience: (req.get("str-audience") || '').toUpperCase(),
        headers: {
          "Content-Type": req.get("Content-Type"),
          Referer: req.get("referer"),
          "User-Agent": req.get("User-Agent")
        }
      };
      console.log(`${req.originalUrl} => `,req.body);
      controller(httpRequest)
        .then(
          ({
            headers: headers = {
              "Content-Type": "application/json",
              "Last-Modified": new Date().toUTCString()
            },
            type = "json",
            statusCode: code = 200,
            body
          }) => {
            if (!body) throw new Error("EMPTY_RESPONSE");
            res.set(headers);
            res.type(type);
            res.status(code).send(body);
          }
        )
        .catch(error => {
          let Responce = new errHandler(error).send();
          res
            .status(Responce.statusCode)
            .set({
              "Content-Type": "application/json",
              "Last-Modified": new Date().toUTCString()
            })
            .send(Responce.body);
        });
    } catch (error) {
      let Responce = new errHandler(error).send();
      res
        .status(Responce.statusCode)
        .set({
          "Content-Type": "application/json",
          "Last-Modified": new Date().toUTCString()
        })
        .send(Responce.body);
    }
  };
}

module.exports = makeController