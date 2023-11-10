import express, { Request, Response, Application } from 'express';
import { connect } from './db/mongooseConnect' 
// import dotenv from 'dotenv';

import { router } from './routes/courses.routes'
import { notFound } from './Middelware/notfound';

// dotenv.config();
const app: Application = express();

// connect to db
connect

// middelWares
app.use(express.json());

// routes
app.use('/api/v1/courses', router)

// Errors Handling 
app.use('*', notFound)

// Listen App
const PORT = process.env.PORT

app.listen(PORT,()=>console.log(`App Listening on port ${PORT}`))
