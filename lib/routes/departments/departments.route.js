import express from "express";
import { getDepartments } from "../../handlers/department.handler.js";

const departmentsRouter = express.Router();

// Get
departmentsRouter.get("/departments/", async (req, res) => {
  const data = await getDepartments();

  if (data.status === "ok") {
    return res.status(200).send({ message: data.message, data: data.data });
  } else {
    return res.status(200).send({ message: data.message, data: [] });
  }
});

export default departmentsRouter;
