
import mongoose from "mongoose";
import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { Student } from "../student/student.interface";
import { studentmodel } from "../student/student.models";
import { User} from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../Error/appError";
import httpStatus from "http-status";


const CreateStudentDb= async (password:string,studentData:Student)=>
   
{ 
const userData:Partial<User>={};
userData.password=password || (config.default_pass as string);

userData.role='student';
// find academic semester info
const admissionSemester = await AcademicSemester.findById(
studentData.admissionSemester,
  );
  const session=await mongoose.startSession();
try{
session.startTransaction();
//generate student id
userData.id=await generateStudentId(admissionSemester);
//create a user
const newUser= await UserModel.create([userData],{session});
if(!newUser.length)
    {
        throw new AppError(httpStatus.BAD_REQUEST,'failed to create user')
    } 
    //set id and _id as user
    studentData.id=newUser[0].id;
    studentData.user=newUser[0]._id;
    //create new student
const newStudent = await studentmodel.create([studentData],{session});

if(!newStudent.length)
{
    throw new AppError(httpStatus.BAD_REQUEST,'failed to create student')
}

await session.commitTransaction();
await session.endSession();    
return newStudent;   
}
  catch(err)
{
await session.abortTransaction();
await session.endSession()
}

// create a student

}

export const UserService={
    CreateStudentDb
}   