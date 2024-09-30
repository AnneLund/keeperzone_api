import express from "express";
import bcrypt from "bcryptjs";
import multer from "multer";

import * as mime from "mime-types";

import auth from "../../middleware/auth.middleware.js";
import { getNewUID } from "../../db/keeperzone/misc/helpers.js";

import {
  createClub,
  deleteClub,
  getClubById,
  updateClub,
} from "../../handlers/club.handler.js";
import { checkAdminRole } from "../../middleware/admin.middleware.js";

const clubRouter = express.Router();

// Multer Setup for storage.
const clubStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/clubs");
  },
  filename: function (req, file, cb) {
    let newFileName = getNewUID() + "." + mime.extension(file.mimetype);
    let ext = mime.extension(file.mimetype);

    cb(null, newFileName);
  },
});

const upload = multer({ storage: clubStorage });

// POST
clubRouter.post(
  "/club",
  auth,
  checkAdminRole,
  upload.single("file"),
  async (req, res) => {
    const { name, email, role, password } = req.body;

    const newClub = {
      name: name,
      email: email,
      picture: process.env.SERVER_HOST + "/clubs/no-club.jpg",
      role: role,
    };

    if (req.file) {
      newClub.picture = process.env.SERVER_HOST + "/clubs/" + req.file.filename;
    }

    newClub.hashedPassword = await bcrypt.hash(password, 10);

    const result = await createClub(newClub);

    if (result.status === "ok") {
      return res
        .status(200)
        .send({ message: result.message, data: result.data });
    } else {
      return res.status(200).send({
        message: result.message,
        data: [],
      });
    }
  }
);

// PUT
clubRouter.put(
  "/club",
  auth,
  checkAdminRole,
  upload.single("file"),
  async (req, res) => {
    console.log(req.body.password);
    const updatedClub = {
      ...req.body,
    };

    if (req.body.password) {
      updatedClub.hashedPassword = await bcrypt.hash(req.body.password, 10);
    }

    if (req.file) {
      updatedClub.picture =
        process.env.SERVER_HOST + "/clubs/" + req.file.filename;
    }

    let result = await updateClub(updatedClub);

    if (result.status === "ok") {
      return res
        .status(200)
        .send({ message: result.message, data: result.data });
    } else {
      return res.status(200).send({ message: result.message, data: {} });
    }
  }
);

// DELETE
clubRouter.delete("/club/:id", auth, checkAdminRole, async (req, res) => {
  if (!req.params.id) {
    return res.status(200).send({ message: "No ID provided", data: {} });
  }

  let result = await deleteClub(req.params.id);

  if (result.status === "ok") {
    return res.status(200).send({ message: result.message, data: [] });
  } else {
    return res.status(200).send({ message: result.message, data: {} });
  }
});

// GET By ID
clubRouter.get("/club/:id", auth, async (req, res) => {
  if (!req.params.id) {
    return res.status(200).send({ message: "No ID provided", data: {} });
  }

  let result = await getClubById(req.params.id);

  if (result.status === "ok") {
    return res.status(200).send({ message: result.message, data: result.data });
  } else {
    return res.status(200).send({ message: result.message, data: {} });
  }
});

export default clubRouter;
