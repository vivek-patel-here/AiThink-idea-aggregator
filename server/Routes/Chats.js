const { Router } = require("express");
const router = Router({ mergeParams: true });
const { IsAuthorized } = require("../Config/IsAuthorized.js");
const { body } = require("express-validator");
const { validationReqBody } = require("../Config/validateResult.js");
const { ChatInit, GetAllChats,GetChat ,DeleteChat } = require("../Controller/Chats.controller.js")


//get all the chats
router.get("/all",IsAuthorized,GetAllChats);

//getSpecific Chat By Id
router.get("/:id",IsAuthorized,GetChat);

//Initialise a new Chat
router.post("/init", IsAuthorized, [
    body("idea", "Idea is required"),
], validationReqBody, ChatInit);

//Delete an existing Chat
router.delete("/:id",IsAuthorized,DeleteChat);


module.exports = router;




