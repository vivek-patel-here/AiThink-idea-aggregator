const express = require("express");
const router = express.Router({ mergeParams: true });
const { body } = require("express-validator");
const { validationReqBody } = require("../Config/validateResult.js");
const { IsAuthorized } = require("../Config/IsAuthorized.js");
const { IdeaAggregateLogic } = require("../Controller/IdeaAggregator.js");
const { wrapAsync } = require("../Config/wrapAysnc.js");

router.post(
  "/new",
  IsAuthorized,
  [
    body(
      "query",
      "The query should be meaningful and well-defined."
    ).isString(),
  ],
  validationReqBody,
  wrapAsync(IdeaAggregateLogic)
);

module.exports = router;
