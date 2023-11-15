import { NextFunction, Request, Response } from 'express';
import { Icourse } from "../Interfaces/course.interface";
import { courseService } from "../Services/courses.services";

class CoursesController
{
    async createCourse(req: Request, res: Response, next: NextFunction) {
        const Icourse: Icourse = {
            title: req.body.title,
            price: req.body.price
        }
        try {
            const course = await courseService.craeteCourse(Icourse);
            res.status(200).json(course);
        } catch (err) {
            next(err)
        }
    }

    async getAllCourses(req: Request, res: Response, next: NextFunction) {
        try {
            const courses = await courseService.getAllCourses(req.query);
            res.status(200).json(courses);
        } catch (err) {
            next(err)
        }
    }

    async getCourse(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const task = await courseService.getCourse(id);
            res.json(task);
        } catch (err) {
            next(err)
        }
      }

    async updateCourse(req: Request, res: Response, next:NextFunction) {
        const {id} = req.params;
        const Icourse: Icourse = {
            title: req.body.title,
            price: req.body.price
        }
        try { 
            const course = await courseService.updateCourse(Icourse, id);
            res.status(200).json(course);
        } catch (err) {
            next(err)
        }
    }

    deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
        const {id} = req.params;
        try { 
            const course = await courseService.deleteCourse(id);
            res.status(200).json(course);
        } catch (err) {
            next(err)
        }
        
    }

}

const courseController = new CoursesController();

export {courseController}