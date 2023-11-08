import { model } from "../models/courses.model"; 
import { Icourse } from "../Interfaces/course.interface";
import { Status } from "../utils/httpStatusText"; 

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
            return err
        }
    }

    async getAllCourses() {
        try {
            const courses = await model.find({})
            return {
                status: Status.SUCCESS,
                result: courses.length,
                data: { courses }
            };
         } catch (err) {
            return err
        }
    }

    async getCourse(courseId: any) {
        try {
            const course = await model.findById({ _id: courseId })
            if (!course) {
                return {
                    status: Status.FAIL,
                    msg: 'course not found'                    
                }
            }
            return {
                status: Status.SUCCESS,
                data: {
                    course
                },
            }
        } catch (err) {
            return {
                Status: Status.ERROR,
                Error: err
            };
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
                return {
                    status: Status.FAIL,
                    msg: 'course not found'
                }
            }
            return {
                status: Status.SUCCESS,
                course
            }
        } catch (err) {
            return err
        }
    }

    async deleteCourse(courseId: any) {
        try {
            const course = await model.deleteOne({ _id: courseId })
            if (!course) {
                return {
                    status: Status.FAIL,
                    msg: 'course not found'
                }
            }
            return {
                status: Status.SUCCESS,
                data: null
            };
        } catch (err) {
            return err
        }
    }
}

export const courseService = new CourseService();
