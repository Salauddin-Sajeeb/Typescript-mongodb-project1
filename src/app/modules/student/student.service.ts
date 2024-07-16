
import mongoose, { Error } from "mongoose";
import { studentmodel } from "./student.models";
import httpStatus from "http-status";
import AppError from "../../Error/appError";
import { UserModel } from "../user/user.model";
import { Student } from "./student.interface";

const getAllStudent=async()=>
    {
        const result=await studentmodel.find().populate('admissionSemester').
        populate({path:'academicDepartment',
            populate:{
            path:'academicFaculty'
            }
        });
        return result 
    }

const getSingleStudent=async(id:string)=>
    {    
        const result=await studentmodel.findOne({id}).populate('admissionSemester').
        populate({path:'academicDepartment',
            populate:{
            path:'academicFaculty'
            }
        });
        return result
    }  
    
  const getDeleteStudent=async(id:string)=>
    { 
    const session = await mongoose.startSession()
    try
    {
       session.startTransaction();
       const deleteStudent=await studentmodel.findOneAndUpdate( { id },
        { isDeleted: true },
        { new: true, session },
    )
    if(!deleteStudent)
    {
        throw new AppError(httpStatus.BAD_REQUEST,'failed to delete student')
    }
    const deletedUSer=await UserModel.findOneAndUpdate({id},
        { isDeleted: true },
        { new: true, session }
    )

    if(!deletedUSer)
    {
       throw new AppError(httpStatus.BAD_REQUEST,'failed to delete user') 
    } 
       
    await session.commitTransaction();
    await session.endSession()
    return deleteStudent
    } 

    catch(err)
    {
        await session.abortTransaction();
        await session.endSession();
        throw new Error ('data was not deleted')
    }
       
    } 
    //update student
    const updateStudent=async(id:string,payload:Partial<Student>) =>
    {
    const {name,guardian,LocalGuardian,...remainingStudent}=payload;
    const modifiedData:Record<string,unknown>=
    {
        ...remainingStudent
    }
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
          modifiedData[`name.${key}`] = value;
        }
      }
      if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
          modifiedData[`guardian.${key}`] = value;
        }
      }
    
      if (LocalGuardian && Object.keys(LocalGuardian).length) {
        for (const [key, value] of Object.entries(LocalGuardian)) {
          modifiedData[`LocalGuardian.${key}`] = value;
        }
      }
      const result = await studentmodel.findOneAndUpdate({ id }, modifiedData, {
        new: true,
        runValidators: true,
    });
    return result
    }
     

    export const Studentservice=
    {
        getAllStudent,getSingleStudent,getDeleteStudent,updateStudent
    }