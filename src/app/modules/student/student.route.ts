import express from 'express'
import { studentController } from './student.controller';
import { validateRequest } from '../../middleware/validaterequest';
import{updateValidationSchema} from './student.validation';

const router=express.Router();
router.get('/',studentController.getAllStudent)
router.get('/:studentId',studentController.getSingleStudent)
router.delete('/:studentId',studentController.deleteStudent)
router.patch(
    '/:studentId',
    validateRequest(updateValidationSchema),
    studentController.updateStudentDb,
  );

export const studentRoutes=router;