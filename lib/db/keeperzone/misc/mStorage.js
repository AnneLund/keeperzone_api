import multer from "multer";
import { getNewUID } from "./helpers.js";
import * as mime from "mime-types";

export const departmentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/departments");
  },
  filename: function (req, file, cb) {
    let newFileName = getNewUID() + "." + mime.extension(file.mimetype);
    let ext = mime.extension(file.mimetype);
    cb(null, newFileName);
  },
});

export const clubStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/clubs");
  },
  filename: function (req, file, cb) {
    let newFileName = getNewUID() + "." + mime.extension(file.mimetype);
    let ext = mime.extension(file.mimetype);
    cb(null, newFileName);
  },
});
