const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  loginLogic,
  RegisterLogic,
  LogoutLogic,
} = require("../Controller/AuthLogic");
const { wrapAsync } = require("../Config/wrapAysnc.js");
const { body } = require("express-validator");
const { validationReqBody } = require("../Config/validateResult.js");
const { IsAuthorized } = require("../Config/IsAuthorized.js");

//endpoints
router.post(
  "/register",
  [
    body("username","Please Enter a valid username").isString().isLength({ min: 2 }),
    body("email","Please enter a valid email").isEmail().trim(),
    body("password","Password must be 8 character long.").isString().isLength({ min: 8 }),
  ],
  validationReqBody,
  wrapAsync(RegisterLogic)
);

router.post(
  "/login",
  [
    body("email","Please Enetr a valida email").isEmail().trim(),
    body("password","Password must be 8 character long.").isString().isLength({ min: 8 }),
  ],
  validationReqBody,
  wrapAsync(loginLogic)
);

router.get("/logout", wrapAsync(LogoutLogic));

router .get("/verify",IsAuthorized,(req,res)=>{
  res.status(200).json({success:true,message:"Authorised User"})
})
module.exports = router;
