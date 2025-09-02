const mongoose = require('mongoose');
const config = require("config");
const dbgr = require("debug")("development:mongoose");

mongoose
  .connect(`${config.get("MONGODB_URI")}/scatch`) //basically config.get works on the basis of environment variable.Here we are in development so it take the value from development.json in config
  .then(function () {
    dbgr("connected"); //nothing will print until we set debug environment variable
    // $env:DEBUG = "development:*" development colen walle jitne bi namespaces bne hen sbb ke msg show krna 
    //For again not printing by dbgr-> Remove-Item Env:DEBUG
  })
  .catch(function (err) {
    console.log(err);
  })

module.exports = mongoose.connection;

// $env:NODE_ENV="production" to change environment
// Remove-Item Env:NODE_ENV   For deletion
