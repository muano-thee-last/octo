import express from 'express';
import { getStudents,getStudentId,acceptStudent,rejectStudent} from './applicationsControllers.js';

//all routes in here start with /applications
const Router=express.Router();
//apllicants moc data




//get all applicants
Router.get('/applicants',getStudents);

//status of applicants by user ID
Router.get('/:id/status',getStudentId);

//accepting applicants by user id
Router.patch('/:id/review/accept',acceptStudent);

//rejecting applicants by user id
Router.patch('/:id/review/reject',rejectStudent);

export default Router;