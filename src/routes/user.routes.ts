import { Router } from "express";
import { createUserController, deleteUserController, getAllUsersController, getUserController, updateUserController } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/all", getAllUsersController);
userRouter.get("/:userId", getUserController);
userRouter.post("/", createUserController);
userRouter.delete("/:userId", deleteUserController);
userRouter.put("/", updateUserController);

export default userRouter;