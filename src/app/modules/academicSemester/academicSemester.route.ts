import express from 'express'
import { academicController } from './academicsemester.controller';
import { validateRequest } from '../../middleware/validaterequest';
import { AcademicSemesterValidations } from './academicSemestervalidation';

const router=express.Router();
router.post('/create-academic-semester',validateRequest(AcademicSemesterValidations.createAcdemicSemesterValidationSchema), academicController.createAcademicSemester)
 router.get('/',academicController.getAllAcademicSemesters)
 router.get('/:semesterId',academicController.getSingleAcademicSemester)
 router.patch('/:studentId',validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidationSchema),academicController.updateAcademicSemester)

export const academicSemesterRoute=router;