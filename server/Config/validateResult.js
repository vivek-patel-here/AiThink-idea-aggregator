const { validationResult } = require("express-validator");

const validationReqBody = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, message: result.errors[0].msg });
  }

  next();
};

module.exports ={validationReqBody};