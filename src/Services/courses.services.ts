import { model } from "../models/courses.model"; 
import { Icourse } from "../Interfaces/course.interface";
import { Status } from "../utils/httpStatusText";
import { AppError, createCustomError} from "../utils/appError";
import { NextFunction } from "express";

class CourseService 
{
    async craeteCourse(Icourse: Icourse) {
        const {title, price} = Icourse
        try { 
            const course = await model.create({
                title: title,
                price: price
            })
            return {
                msg: 'course created',
                course
            }
        } catch (err) {
            throw err
        }
    }

    async getAllCourses(query: any) {

        //pagination
        const limit = query.limit || 10;
        const page = query.page || 1;
        const skip = (page - 1) * limit;

        try {
            const courses = await model.find({},{__v: false}).limit(limit).skip(skip)
            return {
                status: Status.SUCCESS,
                result: courses.length,
                data: { courses }
            };
         } catch (err) {
            throw err
        }
    }

    async getCourse(courseId: any) {
        try {
            const course = await model.findById({ _id: courseId },{__v: false})
            if (!course) {
                throw createCustomError(`no Course with this id ${courseId}`, 404, Status.FAIL)
            }
            return {
                status: Status.SUCCESS,
                data: {
                    course
                },
            }
        } catch (err) {
            throw err
        }
    }

    async updateCourse(Icourse: Icourse, courseId: any) {
        const {title, price} = Icourse
        try {
            const course = await model.updateOne(
                { _id: courseId },
                {
                    title: title,
                    price: price
                },
                { new: true }
            )
            if (!course) {
                throw createCustomError(`no Course with this id ${courseId}`, 404, Status.FAIL)
            }
            return {
                status: Status.SUCCESS,
                course
            }
        } catch (err) {
            throw err
        }
    }

    async deleteCourse(courseId: any) {
        try {
            const course = await model.deleteOne({ _id: courseId })
            if (!course) {
                throw createCustomError(`no Course with this id ${courseId}`, 404, Status.FAIL)
            }
            return {
                status: Status.SUCCESS,
                data: null
            };
        } catch (err) {
            throw err
        }
    }
}

export const courseService = new CourseService();
