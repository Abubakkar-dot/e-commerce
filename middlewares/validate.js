// middlewares/validate.js
function validate(schema) {
  return function (req, res, next) {
    const { error } = schema.validate(req.body);
    if (error) {
      req.flash("error", error.details[0].message);
      return res.redirect("/");
    }
    next();
  };
}

module.exports = validate;


