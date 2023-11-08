import { model } from "../models/courses.model"; 
import { Request, Response } from 'express'
import { Icourse } from "../Interfaces/course.interface";

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
            console.log(err)
        }
    }

    async getAllCourses() {
        try {
            const courses = await model.find({})
            return {
                result: courses.length,
                courses
            };
         } catch (err) {
            console.log(err)
        }
    }

    async getCourse(courseId: any) {
        try {
            const course = await model.findById({ _id: courseId })
            return course
        } catch (err) {
            console.log(err)
        }
    }

    async updateCourse(Icourse: Icourse, courseId: any) {
        const {title, price} = Icourse
        try {
            const course = await model.updateOne(
                {
                    _id: courseId
                },
                {
                    title: title,
                    price: price
                }
            )
            return {
                message: 'course updated',
                course
            }
        } catch (err) {
            console.log(err);
        }
    }

    async deleteCourse(courseId: any) {
        try {
            const course = await model.deleteOne({ _Id: courseId })
            return 'course deleted';
        } catch (err) {
            console.log(err)
        }
    }
}

export const courseService = new CourseService();
