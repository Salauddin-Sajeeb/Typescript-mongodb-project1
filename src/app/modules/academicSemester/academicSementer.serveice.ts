
import { academicNamecodeMapper } from "./academicSemester.constant";
import { AcademicSemester } from "./academicSemester.model";
import { TAcademicSemester} from "./academicsemister.inter";

const createAcademicSemester=async(payload:TAcademicSemester)=>
{

if(academicNamecodeMapper[payload.name]!==payload.code)
    {
     throw new Error('invald semester code')
    }
const result=await AcademicSemester.create(payload)
return result

}
const getAllAcademicSemestersFromDB = async () => {
    const result = await AcademicSemester.find();
    return result;
  };
  
  const getSingleAcademicSemesterFromDB = async (id: string) => {
    const result = await AcademicSemester.findById(id);
    return result;
  };
  
  const updateAcademicSemesterIntoDB = async (
    id: string,
    payload: Partial<TAcademicSemester>,
  ) => {
    if (
      payload.name &&
      payload.code &&
     academicNamecodeMapper[payload.name] !== payload.code
    ) {
      throw new Error('Invalid Semester Code');
    }
  
    const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  };


export const academicService={
    createAcademicSemester,getAllAcademicSemestersFromDB,updateAcademicSemesterIntoDB,getSingleAcademicSemesterFromDB
}