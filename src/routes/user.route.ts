import express from 'express';
import { userController } from '../Controllers/user.controller';
import { verifyToken } from '../helpers/jwt/verifyToken';
import { ManageRoles } from '../helpers/jwt/ManageRoles';
import { Roles } from '../utils/userRoles';

export const userRouter = express.Router();

userRouter.route('/')
    .get(verifyToken, ManageRoles.allowedTo(Roles.MANAGER),userController.getAllUsers)

userRouter.route('/:id')
    .put(verifyToken, ManageRoles.allowedTo(Roles.MANAGER),userController.updateUser)
    .get(verifyToken, ManageRoles.allowedTo(Roles.MANAGER),userController.getUser)
    .delete(verifyToken, ManageRoles.allowedTo(Roles.MANAGER),userController.deleteUser)

// ChangePassword
userRouter.put('/changePassword/:id',userController.changePassword)
