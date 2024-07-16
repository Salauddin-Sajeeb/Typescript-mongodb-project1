/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request,Response } from "express";
import { Studentservice } from "./student.service";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch(err:any)
    {
        res.status(500).json({
            success:false,
            message:err.message||'somethig went wrong!',
            error:err,
           
         })
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
     catch(err:any)
     {
        res.status(500).json({
            success:false,
            message:err.message||'somethig went wrong!',
            error:err,   
         })
     }
            
 }

   const deleteStudent=async(req:Request,res:Response)=>
  {
    try{
        const {studentId}=req.params;
        const result=await Studentservice.getDeleteStudent(studentId)
        res.status(200).json({
        success:true,
        message:'deleted successfully',
        data:result
     })

    }
   catch(err:any)
    {
        res.status(500).json({
        success:false,
        message:err.message||'somethig went wrong!',
        error:err,
       
     })
    }     
  }
  //update student
  const updateStudentDb = catchAsync(async (req, res) => {
    const { studentId } = req.params;
    const { student } = req.body;
    const result = await Studentservice.updateStudent(studentId, student);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is updated succesfully',
      data: result,
    });
  });  
     
export const studentController={
getAllStudent,getSingleStudent,deleteStudent,updateStudentDb
}    