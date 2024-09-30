import express from "express";
import { getClubs } from "../../handlers/club.handler.js";

const clubsRouter = express.Router();

// Get
clubsRouter.get("/clubs/", async (req, res) => {
  const data = await getClubs();

  if (data.status === "ok") {
    return res.status(200).send({ message: data.message, data: data.data });
  } else {
    return res.status(200).send({ message: data.message, data: [] });
  }
});

export default clubsRouter;
