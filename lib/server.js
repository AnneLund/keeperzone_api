// Server Modules
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
// Routes
import indexRouter from "./routes/keeperzone/www/index.route.js";
import authRouter from "./routes/auth/auth.js";
import authTokenRouter from "./routes/auth/token.js";
import userRouter from "./routes/users/user.route.js";
import usersRouter from "./routes/users/users.route.js";
import * as path from "path";
import * as url from "url";
import clubRouter from "./routes/clubs/club.route.js";
import clubsRouter from "./routes/clubs/clubs.route.js";
import departmentRouter from "./routes/departments/department.route.js";
import departmentsRouter from "./routes/departments/departments.route.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const __filename = url.fileURLToPath(import.meta.url);

const server = {};
const expressServer = express();
expressServer.use(bodyParser.json());
expressServer.use(bodyParser.urlencoded({ extended: true }));
expressServer.use(cors());
expressServer.use(cookieParser());

// Serve static files from the public and www directories.
expressServer.use(express.static("[keeperzone]"));
expressServer.use(express.static("public"));
expressServer.use(express.static("sites"));

/*

  Routes

*/

// Index Client Frontend Routes
expressServer.use(indexRouter);

// Backend API Routes
expressServer.use(authRouter);
expressServer.use(authTokenRouter);

// Backend API Users Routes
expressServer.use(usersRouter);
expressServer.use(userRouter);

// Backend API Clubs Routes
expressServer.use(clubRouter);
expressServer.use(clubsRouter);

// Backend API Departments Routes
expressServer.use(departmentRouter);
expressServer.use(departmentsRouter);

// Project Specific Routes.

// Sites Management

/*

  Run Server

*/
server.run = () => {
  console.log("\n\n---------------------");
  console.log("Server Started", process.env.NODE_ENV, process.env.SERVER_HOST);
  console.log("\n\n---------------------");

  expressServer.listen(process.env.SERVER_PORT, () =>
    console.log(`Running : ${process.env.SERVER_PORT}`)
  );
};

export default server;
