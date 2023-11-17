import express, { Router } from 'express';
import {courseController} from '../Controllers/courses.controller'
import { verifyToken } from '../helpers/jwt/verifyToken';
import { Roles } from '../utils/userRoles';
import { ManageRoles } from '../helpers/jwt/ManageRoles';

export const courseRouter: Router = express.Router();

courseRouter.route('/')
    .get(verifyToken, ManageRoles.allowedTo(Roles.ADMIN, Roles.MANAGER, Roles.USER), courseController.getAllCourses)
    .post(verifyToken, ManageRoles.allowedTo(Roles.ADMIN, Roles.MANAGER), courseController.createCourse)

    courseRouter.route('/:id')
    .get(verifyToken, ManageRoles.allowedTo(Roles.ADMIN, Roles.MANAGER, Roles.USER), courseController.getCourse)
    .put(verifyToken, ManageRoles.allowedTo(Roles.ADMIN, Roles.MANAGER), courseController.updateCourse)
    .delete(verifyToken, ManageRoles.allowedTo(Roles.ADMIN, Roles.MANAGER), courseController.deleteCourse)



