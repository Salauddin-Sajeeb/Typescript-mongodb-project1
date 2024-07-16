import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { studentRoutes } from '../modules/student/student.route';
import { academicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/faculty.route';
import { AcademicDepartmentRoutes } from '../modules/Department/department.route';


const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRoute,
  },
 { 
  path: '/academic-faculty',
  route: AcademicFacultyRoutes,
 },
 { 
  path: '/academic-department',
  route: AcademicDepartmentRoutes,
 },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;