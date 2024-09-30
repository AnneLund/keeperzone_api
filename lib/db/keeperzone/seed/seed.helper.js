import userModel from "../../models/user.model.mjs";
import clubModel from "../../models/club.model.mjs";
import dbConnect from "../../dbConnect.js";
import departmentModel from "../../models/department.model.mjs";

/*

    Create new User

*/
export const seedUser = async (user) => {
  console.log("-- User --");
  console.log(user);
  console.log("--\n");

  await dbConnect();

  try {
    user.picture = process.env.SERVER_HOST + user.picture;
    let newUser = await userModel.create(user);

    return newUser;
  } catch (error) {
    console.log(error);
  }
};

/*

    Create new Club

*/

export const seedClub = async (club) => {
  console.log("-- Club --");
  console.log(club);
  console.log("--\n");

  await dbConnect();

  try {
    club.picture = process.env.SERVER_HOST + club.picture;
    let newClub = await clubModel.create(club);

    return newClub;
  } catch (error) {
    console.log(error);
  }
};

/*

    Create new Department

*/

export const seedDepartment = async (department) => {
  console.log("-- Department --");
  console.log(department);
  console.log("--\n");

  await dbConnect();

  try {
    department.picture = process.env.SERVER_HOST + department.picture;
    let newDepartment = await departmentModel.create(department);

    return newDepartment;
  } catch (error) {
    console.log(error);
  }
};
