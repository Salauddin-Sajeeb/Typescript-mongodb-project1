import { Request,Response } from "express";
import { Studentservice } from "./student.service";



const createStudent= async (req:Request, res:Response)=>
    {

    try{
        const {student:studentData}=req.body;
        const result= await Studentservice.CreateStudentDb(studentData);
   
        res.status(200).json({
           success:true,
           message:'student is created',
           data:result
        })
    }
    catch(err)
    {
        console.log(err)
    }

    }

    const getAllStudent=async(req:Request,res:Response)=>
    {
    try{
     const result=await Studentservice.getAllStudent()
     res.status(200).json({
        success:true,
        message:'student data retreated',
        data:result
     })

    }
 catch(err)
 {
  console.log(err)
 }
        
    }
    const getSingleStudent=async(req:Request,res:Response)=>
        {
        try{
            const {studentId}=req.params;
         const result=await Studentservice.getSingleStudent(studentId)
         res.status(200).json({
            success:true,
            message:'Single Student Data retreated',
            data:result
         })
    
        }
     catch(err)
     {
      console.log(err)
     }
            
        }
     
export const studentController={
createStudent,getAllStudent,getSingleStudent
}    