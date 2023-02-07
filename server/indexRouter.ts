import express, { Router } from "express";

import {
  // dashboard,
  // getTestRoute,
  login,
  logout,
  register,
  verifyToken,
} from "./controllers/authController";
import { createTodo, getUserList, getWholeList, updateTodo } from "./controllers/todoListController";
import { checkAuth } from "./middleware";

const indexRouter: Router = express.Router();

//* Auth
indexRouter.post("/register", register);

indexRouter.post("/login", login);

indexRouter.post("/logout", logout);

//* Unnecessary - for testing only
// indexRouter.get("/dashboard", checkAuth, dashboard);

indexRouter.post("/verify", checkAuth, verifyToken);

//* Todo List
indexRouter.get("/dashboard/all-todos", checkAuth, getWholeList);

indexRouter.get("/dashboard/user-list", checkAuth, getUserList);

indexRouter.post("/todos", checkAuth, createTodo);

// Update a todo
indexRouter.put("/todos/:id", checkAuth, updateTodo);

// // Test route
// indexRouter.get("/test", getTestRoute);

export default indexRouter;
