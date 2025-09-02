const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config")
const productModel = require("../models/product-model")
const productModelSchema = require("../validations/productValidation")

router.post("/create", upload.single("image"), async function (req, res) {
  const { error } = productModelSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const messages = error.details.map(err => err.message);
    // e.g., messages = ["Name is required", "Email is invalid"]
    req.flash("success", messages);
    return res.redirect("/owner/admin");
  }


  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash("success", "Product created successfully.")
    res.redirect("/owner/admin")
  }
  catch (err) {
    res.send(err.message);
  }
})

module.exports = router;