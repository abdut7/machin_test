class errHandler extends Error {
  //   let errCommon 
  //   let errModuleWise 
  //   let HTTP_R_S_Code 
  //   var isError  
  constructor(message = "SOMETHING_WENT_WRONG", errType = "errCommon") {
    super();
    Error.captureStackTrace(this, this.constructor);
    if (errType == "errServer") {
      errType = "errCommon";
      console.log(`\n${new Date().toUTCString()} :-`);
      console.log(message);
    }
    if (typeof message === "object") {
      if (message instanceof Error) {
        console.log(`\n${new Date().toUTCString()} :-`);
        console.log(message);
        // logger.error(message)
        this.message = {
          strMessage: message.strMessage || "SOMETHING_WENT_WRONG",
          apiStatus:"error",
          objDetails: message.objDetails || {
            "reason": "unknown"
          }
        }
      } else {
        this.message = {
          strMessage: message.strMessage || "SOMETHING_WENT_WRONG",
          apiStatus:"error",
          objDetails: message.objDetails || {
            "reason": "unknown"
          }
        }
      }
      this.isError = true;
    } else if (message) {
      console.log(typeof message);
      this.message = {
        strMessage: message || "SOMETHING_WENT_WRONG",
        apiStatus:"error",
        objDetails: {
          "reason": "unknown"
        }
      }
      this.isError = true;
    }
  }


  // /**
  //  * Function for set responce status code
  //  * for the request
  //  * Code List :-
  //  * * 400 -> Bad Request
  //  * * 401 -> Unauthorized
  //  * * 404 -> Not Found
  //  * * 405 -> Method Not Allowed [GET,POST,etc...]
  //  * * 406 -> Not Acceptable
  //  * * 408 -> Request Timeout
  //  * * 429 -> Too Many Requests
  //  * * 500 -> Internal Server Error
  //  * * 501 -> Not Implemented
  //  * * 503 -> Service Unavailable
  //  * @param {StatusCode} HTTP_R_S_Code -
  //  * passing status code
  //  *    |-> Eg: 400
  //  * @remarks Default Responce code will be 400
  //  * @returns null
  //  */
  // setStatus(HTTP_R_S_Code: StatusCode) {
  //   this.HTTP_R_S_Code = HTTP_R_S_Code;
  //   return this;
  // }
  
  set({
    statusCode = 400
  } = {}) {
    return {
      ...this.message,
      statusCode
    };
  }
  send({
    statusCode = 400
  } = {}) {
    return {
      body: this.message,
      statusCode
    };
  }
}

module.exports =  errHandler