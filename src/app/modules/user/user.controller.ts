/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";

const createStudent= catchAsync(async (req:Request, res:Response)=>
    
    {
        //creating validation using zod
        // const {student:studentData}=req.body;
        //const zodParsedata=UserValidation.parse(studentData)
        const {password,student:studentData}=req.body;
        const result= await UserService.CreateStudentDb(password,studentData);
           
        sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'student is created',
        data:result
         })
    })
     
    
export const UserController={
    createStudent
}