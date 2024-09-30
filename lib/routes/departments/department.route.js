import express from "express";
import bcrypt from "bcryptjs";
import multer from "multer";

import * as mime from "mime-types";

import auth from "../../middleware/auth.middleware.js";
import { getNewUID } from "../../db/keeperzone/misc/helpers.js";

import {
  createDepartment,
  deleteDepartment,
  getDepartmentById,
  updateDepartment,
} from "../../handlers/department.handler.js";
import { checkAdminRole } from "../../middleware/admin.middleware.js";

const departmentRouter = express.Router();

// Multer Setup for storage.
const departmentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/departments");
  },
  filename: function (req, file, cb) {
    let newFileName = getNewUID() + "." + mime.extension(file.mimetype);
    let ext = mime.extension(file.mimetype);

    cb(null, newFileName);
  },
});

const upload = multer({ storage: departmentStorage });

// POST
departmentRouter.post(
  "/department",
  auth,
  checkAdminRole,
  upload.single("file"),
  async (req, res) => {
    const { name, email, role, password } = req.body;

    const newDepartment = {
      name: name,
      email: email,
      picture: process.env.SERVER_HOST + "/departments/no-department.jpg",
      role: role,
    };

    if (req.file) {
      newDepartment.picture =
        process.env.SERVER_HOST + "/departments/" + req.file.filename;
    }

    newDepartment.hashedPassword = await bcrypt.hash(password, 10);

    const result = await createDepartment(newDepartment);

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
departmentRouter.put(
  "/department",
  auth,
  checkAdminRole,
  upload.single("file"),
  async (req, res) => {
    console.log(req.body.password);
    const updatedDepartment = {
      ...req.body,
    };

    if (req.body.password) {
      updatedDepartment.hashedPassword = await bcrypt.hash(
        req.body.password,
        10
      );
    }

    if (req.file) {
      updatedDepartment.picture =
        process.env.SERVER_HOST + "/departments/" + req.file.filename;
    }

    let result = await updateDepartment(updatedDepartment);

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
departmentRouter.delete(
  "/department/:id",
  auth,
  checkAdminRole,
  async (req, res) => {
    if (!req.params.id) {
      return res.status(200).send({ message: "No ID provided", data: {} });
    }

    let result = await deleteDepartment(req.params.id);

    if (result.status === "ok") {
      return res.status(200).send({ message: result.message, data: [] });
    } else {
      return res.status(200).send({ message: result.message, data: {} });
    }
  }
);

// GET By ID
departmentRouter.get("/department/:id", auth, async (req, res) => {
  if (!req.params.id) {
    return res.status(200).send({ message: "No ID provided", data: {} });
  }

  let result = await getDepartmentById(req.params.id);

  if (result.status === "ok") {
    return res.status(200).send({ message: result.message, data: result.data });
  } else {
    return res.status(200).send({ message: result.message, data: {} });
  }
});

export default departmentRouter;
