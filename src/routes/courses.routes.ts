import express, { Router } from 'express';
import {courseController} from '../Controllers/courses.controller'
import { verifyToken } from '../Middelware/verifyToken';

export const courseRouter: Router = express.Router();

courseRouter.route('/')
    .get(verifyToken,courseController.getAllCourses)
    .post(courseController.createCourse)

    courseRouter.route('/:id')
    .get(courseController.getCourse)
    .put(courseController.updateCourse)
    .delete(courseController.deleteCourse)



