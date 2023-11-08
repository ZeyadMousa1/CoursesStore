import express, { Request, Response, Application } from 'express';
import {connect} from './db/mongooseConnect' 

import { router } from './routes/courses.routes'
import { notFound } from './Middelware/notfound';

const app: Application = express();

// connect to db
connect

// middelWares
app.use(express.json());

// routes
app.use('/api/v1/courses', router)

// Errors Handling 
app.use('*',notFound)

app.listen(5000,()=>console.log('App Listening on port 3000'))
