const userModel = require("../models/user-model");
const userValidationSchema = require("../validations/userValidation");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      req.flash("error", error.details[0].message);
      return res.redirect("/");
    }

    let { email, password, fullname } = req.body;
    let existingUser = await userModel.findOne({ email });

    if (existingUser) {
      req.flash("error", "You already have an account, please login");
      return res.redirect("/");
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          req.flash("error", "Something went wrong during registration");
          return res.redirect("/");
        }

        let user = await userModel.create({
          email,
          password: hash,
          fullname
        });

        let token = generateToken(user);
        res.cookie("token", token);
        return res.redirect("/shop");
      });
    });
  } catch (err) {
    req.flash("error", "Server Error");
    return res.redirect("/");
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) {
    req.flash("error", "Email or Password Incorrect");
    return res.redirect("/");
  }

  bcrypt.compare(password, user.password, function (err, result) {
    if (err || !result) {
      req.flash("error", "Email or Password Incorrect");
      return res.redirect("/");
    }

    let token = generateToken(user);
    res.cookie("token", token);
    return res.redirect("/shop");
  });
};

module.exports.logout = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
