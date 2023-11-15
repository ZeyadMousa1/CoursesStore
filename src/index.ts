import express, {Application, NextFunction} from 'express';
import { connect } from './db/mongooseConnect' 
import cors  from 'cors';

import { courseRouter } from './routes/courses.routes'
import {userRouter} from './routes/user.route'
import { notFound, errorHandlerMiddelware } from './Middelware/ErrorHandling';

const app: Application = express();

// connect to db
connect

// middelWares
app.use(cors())
app.use(express.json());

// routes
app.use('/api/v1/courses', courseRouter)
app.use('/api/v1/users', userRouter)

// Errors Handling 
app.use(errorHandlerMiddelware)
app.use('*', notFound)

// Listen App
const PORT = process.env.PORT

app.listen(PORT,()=>console.log(`App Listening on port ${PORT}`))
