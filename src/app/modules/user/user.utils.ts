import { TAcademicSemester } from "../academicSemester/academicsemister.inter";
import { UserModel } from "./user.model";


export const generateStudentId=async(payload:TAcademicSemester)=>
{
    const findLastStudentId = async () => {
        const lastStudent = await UserModel.findOne(
          {
            role: 'student',
          },
          {
            id: 1,
            _id: 0,
          },
        )
          .sort({
            createdAt: -1,
          })
          .lean();
      
        //203001   0001
        return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
      };
 //assign currentid
 let currentId=(0).toString();

const lastStudentId=await findLastStudentId();
const lastStudentYear=lastStudentId?.substring(0,4);
const lastStudentSemestercode=lastStudentId?.substring(0,4);
const currentSemestercode=payload.code;
const currentyear=payload.year;

if(lastStudentSemestercode&&lastStudentId===currentSemestercode&&lastStudentYear===currentyear)
{
currentId=lastStudentId.substring(6)
}
let incrementId=(Number(currentId)+1).toString().padStart(4, '0');
incrementId=`${payload.year}${payload?.code}${incrementId}`;
return incrementId;
}