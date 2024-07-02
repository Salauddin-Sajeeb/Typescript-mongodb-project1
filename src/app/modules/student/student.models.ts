import { Schema,model } from 'mongoose';
import { LocalGuardian, Student, Username, guardian } from './student.interface';

const userSchema=new Schema <Username>({
    
    firstName:{type :String,required:true},
    lastName:{type:String,required:true}
                   
})
const guardianSchema=new Schema<guardian>({
    father:{type:String,required:true},
    mother:{type:String,required:true},
    fatherMob:{type:Number,required:true},
    motherMob:{type:Number,required:true},

});

const localGuardianSchema=new Schema<LocalGuardian>(
    {
        name:{type:String,required:true},
        address:{type:String,required:true},
        mobile:{type:String,required:true},
    }
)

const studentSchema=new Schema <Student>
(
    {
    id:{type:String},
    name:userSchema,

    gender:["male","female"],
    email:{type:String,required:true},
    Mobile:{type:String,required:true},
    guardian:guardianSchema,
    LocalGuardian:localGuardianSchema
}
)

//model

export const studentmodel= model<Student>('Student',studentSchema);