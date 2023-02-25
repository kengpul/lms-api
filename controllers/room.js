const Room = require("../models/room");
const User = require("../models/user");
const ExpressError = require("../utils/ExpressError");

module.exports.getAll = async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "rooms",
    populate: {
      path: "teachers",
    },
  });
  res.json(user.rooms);
};

module.exports.getOne = async (req, res) => {
  const room = await Room.findById(req.params.id)
    .populate("teachers")
    .populate("students")
    .populate("pending");
  res.json(room);
};

module.exports.create = async (req, res) => {
  const room = new Room(req.body);
  const user = req.user;
  room.teachers.push(user._id);
  user.rooms.push(room._id);
  await room.save();
  await user.save();
  res.json(room);
};

module.exports.join = async (req, res) => {
  const { code } = req.body;

  if (!code) return;
  const codeExist = await Room.findOne({ code });
  if (!codeExist) throw new ExpressError("Invalid code", 400);

  const user = await User.findById(req.user._id).populate("rooms");
  const joined = user.rooms.find((room) => room.code === code);
  if (joined)
    throw new ExpressError("You are already member of this room", 400);

  const room = await Room.findOne({ code });
  room.pending.push(user._id);

  await room.save();
  await user.save();
  res.json(room);
};

module.exports.reject = async (req, res) => {
  const room = await Room.findById(req.params.id)
    .populate("pending")
    .populate("teachers")
    .populate("students");
  const pending = room.pending.filter((student) => student._id != req.body.id);
  room.pending = pending;
  await room.save();
  res.json(room);
};

module.exports.accept = async (req, res) => {
  const { id } = req.body;
  const { id: roomId } = req.params;

  const room = await Room.findById(roomId);

  const user = await User.findById(req.body.id);
  user.rooms.push(roomId);

  const pending = room.pending.filter((student) => student._id != id);
  room.pending = pending;

  if (user.type === "Teacher") {
    room.teachers.push(id);
  } else {
    room.students.push(id);
  }

  await room.save();
  await user.save();

  const updatedRoom = await Room.findById(roomId)
    .populate("pending")
    .populate("students")
    .populate("teachers");

  res.json(updatedRoom);
};

module.exports.leave = async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "rooms",
    populate: {
      path: "teachers",
    },
  });
  const rooms = user.rooms.filter((room) => room._id != req.params.id);
  user.rooms = rooms;
  user.save();
  res.json(user.rooms);
};

module.exports.links = async (req, res) => {
  const room = await Room.findById(req.params.id);
  room.link = req.body;
  await room.save();
  res.json(room.link);
};
