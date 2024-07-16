import { Schema, model } from "mongoose";
import { User } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";

const UserSchema=new Schema<User>(
    {
    id: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      needsPasswordChange: {
        type: Boolean,
        default: true,
      },
      role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
      },
      status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress',
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    })
    UserSchema.pre('save',async function(next)
    {
       this.password=await bcrypt.hash(this.password,Number(config.bcrypt_salt_round));
       next()
    })
    //showing password empty after create user
       UserSchema.post('save',function(doc,next){
       doc.password='';
       next()
    }
    )  
export const UserModel=model<User>('User',UserSchema);    