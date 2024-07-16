import { Schema,model } from 'mongoose';
import { LocalGuardian, Student, Username, guardian } from './student.interface';
import bcrypt from 'bcrypt'
import config from '../../config';


const userSchema=new Schema <Username>
({
    
    firstName:{type:String,required:true,maxlength:10},
    lastName:{type:String,required:true}
                   
})
const guardianSchema=new Schema<guardian>
({
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
    id:{type:String,required:true,unique:true},
    user:{type:Schema.Types.ObjectId,unique:true, ref: 'User',
    required:[true,'user is required']},
    password:{type:String},
    name:{type:userSchema,required:true},
    gender:{
    type:String,    
    enum:["male","female"],
    required:true
    },
    email:{type:String,required:true},
    Mobile:{type:String,required:true},
    guardian:guardianSchema,
    LocalGuardian:localGuardianSchema,
    isDeleted: {
        type: Boolean,
        default: false,
      },
    admissionSemester: {
        type: Schema.Types.ObjectId,
         ref: 'AcademicSemester',
        },
    academicDepartment: {
    type:Schema.Types.ObjectId,
    ref:"AcademicDepartment",
    }
  
},{
    toJSON:{
        virtuals:true
    }
}
)

//virtual data
studentSchema.virtual('fullName').get(function()
{
    return `${this.name.firstName} ${this.name.lastName}`;
}) 
//middleware 
//password hash
studentSchema.pre('save',async function(next)
{
   this.password=await bcrypt.hash(this.password,Number(config.bcrypt_salt_round));
   next()
})
//showing password empty after create user
   studentSchema.post('save',function(doc,next){
   doc.password='';
   next()
}
)  
//query middleware
studentSchema.pre('find',function(next)    
{
   this.find({isDelted:{$ne:true}})
   next() 
}) 
studentSchema.pre('findOne',function(next)
{
   this.findOne({isDelted:{$ne:true}})
   next()
}) 


export const studentmodel= model<Student>('Student',studentSchema);