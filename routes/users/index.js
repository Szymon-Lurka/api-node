import express from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../../controllers/users/user-controller.js";


const userRouter = express.Router();

userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser);
userRouter
    .route('/:id')
    .get(getUser)
    .delete(deleteUser)
    .patch(updateUser);

export default userRouter;
