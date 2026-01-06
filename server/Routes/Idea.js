const express = require("express");
const router = express.Router({ mergeParams: true });
const { body } = require("express-validator");
const { validationReqBody } = require("../Config/validateResult.js");
const { IsAuthorized } = require("../Config/IsAuthorized.js");
const { IdeaAggregateLogic,saveIdeaLogic ,fetchIdeas,destroyIdeaLogic} = require("../Controller/IdeaAggregator.js");
const { wrapAsync } = require("../Config/wrapAysnc.js");

router.post(
  "/new",
  IsAuthorized,
  [
    body(
      "query",
      "The query should be meaningful and well-defined."
    ).isString(),
    body("projectType","The projectType is required.").isString(),
    body("duration","The Project duration is required.").isString(),
  ],
  validationReqBody,
  wrapAsync(IdeaAggregateLogic)
);

router.post(
  "/save",
  IsAuthorized,
  [
    body("problem", "The problem statement is required.").isString(),
    body("techStack", "The tech stack is required.").isString(),
    body("title", "The title is required.").isString(),
    body("description", "The description is required.").isString(),
    body("duration","Duration is required").isString(),
    body("projectType","Project Type is required.").isString(),

  ],
  validationReqBody,
  wrapAsync(saveIdeaLogic)
);


router.get(
  "/all",
  IsAuthorized,
  wrapAsync(fetchIdeas)
);


router.delete("/:idea_id",IsAuthorized,wrapAsync(destroyIdeaLogic));


module.exports = router;