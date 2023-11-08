import { model } from "../models/courses.model"; 
import { Request, Response } from 'express';
import { Icourse } from "../Interfaces/course.interface";
import { courseService } from "../Services/courses.services";

class CoursesController
{
    async createCourse(req: Request, res: Response) {
        const Icourse: Icourse = {
            title: req.body.title,
            price: req.body.price
        }
        const course = await courseService.craeteCourse(Icourse);
        res.status(200).json(course);
    }

    async getAllCourses(req: Request, res: Response) {
        const courses = await courseService.getAllCourses();
        res.status(200).json(courses);
    }

    async getCourse(req: Request, res: Response) {
        const courseId = req.params.id
        const course = await courseService.getCourse(courseId);
        if (course instanceof Error)
            res.status(404).json(course.message)
        res.status(200).json(course);
    }

    async updateCourse(req: Request, res: Response) {
        const courseId = req.params.id;
        const Icourse: Icourse = {
            title: req.body.title,
            price: req.body.price
        }
        const course = await courseService.updateCourse(Icourse, courseId);
        res.status(200).json(course);
    }

    deleteCourse = async (req: Request, res: Response) => {
        const courseId = req.params.id;
        const course = await courseService.deleteCourse(courseId);
        res.status(200).json(course);
    }

}

const courseController = new CoursesController();

export {courseController}