import dbConnect from "../db/dbConnect.js";
import departmentModel from "../db/models/department.model.mjs";
import { deleteDepartmentImage } from "./file.handler.js";

export const getDepartments = async () => {
  let result = {
    status: "error",
    message: "An Error Occurred - See Database log.",
    data: [],
  };

  await dbConnect();

  try {
    let data = await departmentModel.find({}).select("-__v");
    result = {
      status: "ok",
      message: "Departments fetched successfully",
      data: data,
    };
  } catch (error) {
    console.log(error);
  }

  return result;
};

export const createDepartment = async (body) => {
  let result = {
    status: "error",
    message: "An Error Occurred - See Database log.",
    data: [],
  };

  await dbConnect();

  try {
    body.picture =
      body.picture === undefined
        ? `${process.env.SERVER_HOST}/departments/no-department.jpg`
        : body.picture;

    let data = await departmentModel.create(body);
    result = {
      status: "ok",
      message: "Department created successfully",
      data: data,
    };
  } catch (error) {
    console.log(error);
  }

  return result;
};

export const updateDepartment = async (department) => {
  let result = {
    status: "error",
    message: "An Error Occurred - See Database log.",
    data: [],
  };

  await dbConnect();
  await deleteDepartmentImage(department.id);

  try {
    let data = await departmentModel.findByIdAndUpdate(
      department.id,
      department,
      { new: true }
    );
    result = {
      status: "ok",
      message: "Department updated successfully",
      data: data,
    };
  } catch (error) {
    console.log(error);
  }

  return result;
};

export const deleteDepartment = async (id) => {
  let result = {
    status: "error",
    message: "An Error Occurred - See Database log.",
    data: [],
  };
  await deleteDepartmentImage(id);
  await dbConnect();

  try {
    let data = await departmentModel.findByIdAndDelete(id);
    result = {
      status: "ok",
      message: "Department deleted successfully",
      data: data,
    };
  } catch (error) {
    console.log(error);
  }

  return result;
};

export const getDepartmentById = async (id) => {
  let result = {
    status: "error",
    message: "An Error Occurred - See Database log.",
    data: [],
  };

  await dbConnect();

  try {
    let data = await departmentModel.findById(id);
    result = {
      status: "ok",
      message: "Department fetched successfully",
      data: data,
    };
  } catch (error) {
    console.log(error);
  }

  return result;
};
