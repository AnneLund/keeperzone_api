import dbConnect from "../db/dbConnect.js";
import clubModel from "../db/models/club.model.mjs";
import { deleteClubImage } from "./file.handler.js";

export const getClubs = async () => {
  let result = {
    status: "error",
    message: "An Error Occurred - See Database log.",
    data: [],
  };

  await dbConnect();

  try {
    let data = await clubModel.find({}).select("-__v");
    result = {
      status: "ok",
      message: "Clubs fetched successfully",
      data: data,
    };
  } catch (error) {
    console.log(error);
  }

  return result;
};

export const createClub = async (body) => {
  let result = {
    status: "error",
    message: "An Error Occurred - See Database log.",
    data: [],
  };

  await dbConnect();

  try {
    body.picture =
      body.picture === undefined
        ? `${process.env.SERVER_HOST}/clubs/no-club.jpg`
        : body.picture;

    let data = await clubModel.create(body);
    result = { status: "ok", message: "Club created successfully", data: data };
  } catch (error) {
    console.log(error);
  }

  return result;
};

export const updateClub = async (club) => {
  let result = {
    status: "error",
    message: "An Error Occurred - See Database log.",
    data: [],
  };

  await dbConnect();
  await deleteClubImage(club.id);

  try {
    let data = await clubModel.findByIdAndUpdate(club.id, club, { new: true });
    result = { status: "ok", message: "Club updated successfully", data: data };
  } catch (error) {
    console.log(error);
  }

  return result;
};

export const deleteClub = async (id) => {
  let result = {
    status: "error",
    message: "An Error Occurred - See Database log.",
    data: [],
  };
  await deleteClubImage(id);
  await dbConnect();

  try {
    let data = await clubModel.findByIdAndDelete(id);
    result = { status: "ok", message: "Club deleted successfully", data: data };
  } catch (error) {
    console.log(error);
  }

  return result;
};

export const getClubById = async (id) => {
  let result = {
    status: "error",
    message: "An Error Occurred - See Database log.",
    data: [],
  };

  await dbConnect();

  try {
    let data = await clubModel.findById(id);
    result = { status: "ok", message: "Club fetched successfully", data: data };
  } catch (error) {
    console.log(error);
  }

  return result;
};
