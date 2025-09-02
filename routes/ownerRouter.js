// const express = require("express");
// const router = express.Router();
// const ownerModel = require("../models/owner-model.js")

// router.get("/", function (req, res) {
//   res.send("hey it's working");
// })


// console.log(process.env.NODE_ENV); //Not any env setup yet 
// // to set it 
// // $env:NODE_ENV = "development"
// // This route is available until our environment is development and when we deploy it or environment is production... then it is not available.
// if(process.env.NODE_ENV=="development"){
// router.post("/create", function (req, res) {
//   res.send("hey it's working");
// })
// }



// module.exports = router;














const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model.js")


if (process.env.NODE_ENV == "development") {
  router.post("/create", async function (req, res) {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res
        .status(503)
        .send("You don't have permission to create a owner");
    }

    let { fullname, email, password } = req.body;
    let createdowner = await ownerModel.create({
      fullname,
      email,
      password,
    });
    res.status(201).send(createdowner);
  })
}



router.get("/admin", function (req, res) {
  const success = req.flash("success");
  res.render("createProducts", { success });
})


module.exports = router;