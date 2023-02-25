const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const {
  requireAuth,
  validateCreateRoom,
  uniqueRoom,
} = require("../middlewares/");
const room = require("../controllers/room");

router.use(catchAsync(requireAuth));

router.route("/")
  .get(catchAsync(room.getAll))
  .post(validateCreateRoom, catchAsync(uniqueRoom), catchAsync(room.create));

router.post("/join", catchAsync(room.join));

router.route("/:id")
    .get(catchAsync(room.getOne))
    .delete(catchAsync(room.leave))

router.route("/:id/pending")
  .post(catchAsync(room.accept))
  .delete(catchAsync(room.reject));

module.exports = router;
