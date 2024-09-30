import { seedClub, seedUser, seedDepartment } from "../seed/seed.helper.js";
import bcrypt from "bcryptjs";

export const seedUsers = async () => {
  // Seeding Admin User
  const admin = await seedUser({
    name: "admin",
    email: "annels87@hotmail.com",
    picture: "/users/no-user.jpg",
    role: "admin",
    hashedPassword: await bcrypt.hash("admin", 10),
  });

  // Seeding Instructor User
  const instructor = await seedUser({
    name: "Mikkel",
    email: "mikkel@hotmail.com",
    picture: "/users/no-user.jpg",
    role: "instructor",
    hashedPassword: await bcrypt.hash("guest", 10),
  });

  // Seeding Aspirant User
  const aspirant = await seedUser({
    name: "Morten",
    email: "morten@hotmail.com",
    picture: "/users/no-user.jpg",
    role: "aspirant",
    hashedPassword: await bcrypt.hash("guest", 10),
  });

  return true;
};

export const seedClubs = async () => {
  // Seeding NFB Club
  const nfb = await seedClub({
    name: "NFB",
    picture: "/clubs/no-club.jpg",
    location: "Nørresundby",
  });
  // Seeding Aalborg Chang Club
  const chang = await seedClub({
    name: "Aalborg Chang",
    picture: "/clubs/no-club.jpg",
    location: "Aalborg",
  });

  return true;
};

export const seedDepartments = async () => {
  // Seeding A-TRUP
  const aTrup = await seedDepartment({
    name: "A-Trup seniore",
    picture: "/departments/no-department.jpg",
  });
  // Seeding u-19
  const u19 = await seedDepartment({
    name: "U-19",
    picture: "/departments/no-department.jpg",
  });
  // Seeding u-17
  const u17 = await seedDepartment({
    name: "U-17",
    picture: "/departments/no-department.jpg",
  });

  // Seeding u-16
  const u16 = await seedDepartment({
    name: "U-16",
    picture: "/departments/no-department.jpg",
  });

  return true;
};
