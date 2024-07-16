/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { academicService } from "./academicSementer.serveice";

const createAcademicSemester= catchAsync(async (req:Request, res:Response)=>
    
    {
        //creating validation using zod
        // const {student:studentData}=req.body;
        //const zodParsedata=UserValidation.parse(studentData)
        const result= await academicService.createAcademicSemester(req.body); 
        sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Semester is created',
        data:result
         })
    })
    const getAllAcademicSemesters = catchAsync(async (req, res) => {
    const result = await academicService.getAllAcademicSemestersFromDB();
      
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'Academic semesters are retrieved successfully',
          data: result,
        });
      });
      
      const getSingleAcademicSemester = catchAsync(async (req, res) => {
        const { semesterId } = req.params;
        const result =
          await academicService.getSingleAcademicSemesterFromDB(semesterId);
      
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'Academic semester is retrieved succesfully',
          data: result,
        });
      });
      
      const updateAcademicSemester = catchAsync(async (req, res) => {
        const { semesterId } = req.params;
        const result = await academicService.updateAcademicSemesterIntoDB(
          semesterId,
          req.body,
        );
      
        sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: 'Academic semester is retrieved succesfully',
          data: result,
        });
      });   
     
    
export const academicController={
    createAcademicSemester,updateAcademicSemester,getSingleAcademicSemester,getAllAcademicSemesters
}