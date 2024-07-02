
import { Student } from "./student.interface";
import { studentmodel } from "./student.models";

const CreateStudentDb= async (student:Student)=>
   
    { 
     const result= await studentmodel.create(student);
     return result;
    }
const getAllStudent=async()=>
    {
        const result=await studentmodel.find();
        return result
    }

const getSingleStudent=async(id:string)=>
        {
           
            const result=await studentmodel.findOne({id});
            return result
        }   
    export const Studentservice=
    {
        CreateStudentDb,getAllStudent,getSingleStudent
    }