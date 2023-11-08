import express, { Router } from 'express';
import {courseController} from '../Controllers/courses.controller'

const router: Router = express.Router();

router.route('/')
    .get(courseController.getAllCourses)
    .post(courseController.createCourse)

router.route('/:id')
    .get(courseController.getCourse)
    .put(courseController.updateCourse)
    .delete(courseController.deleteCourse)


export {router}

