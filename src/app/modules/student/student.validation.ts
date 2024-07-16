import {  z } from 'zod';

// Define Zod schema for Username
const UsernameSchema = z.object({
    firstName: z.string().min(1).max(10),  
    lastName: z.string().min(1)
});

// Define Zod schema for guardian
const GuardianSchema = z.object({
    father: z.string().min(1),
    mother: z.string().min(1),
    fatherMob: z.number().int().positive(),
    motherMob: z.number().int().positive()
});

// Define Zod schema for LocalGuardian
const LocalGuardianSchema = z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    mobile: z.string().min(1)
});

// Define Zod schema for Student
const StudentSchema = z.object({
    id: z.string().min(1),
    password:z.string(),
    name: UsernameSchema,
    gender: z.enum(["male", "female"]),
    email: z.string().min(1).email(),
    Mobile: z.string().min(1),
    guardian: GuardianSchema,
    LocalGuardian: LocalGuardianSchema, 
    admissionSemester: z.string(),
    academicDepartment: z.string(),
});
const updateName= z.object({
    firstName: z.string().min(1).max(10),  
    lastName: z.string().min(1)
});

const updateLocalGuardian=z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    mobile: z.string().min(1)
});
const updateGuardian=z.object({
    father: z.string().min(1),
    mother: z.string().min(1),
    fatherMob: z.number().int().positive(),
    motherMob: z.number().int().positive()
});


export const updateValidationSchema=z.object({
    body:z.object ({
        password:z.string().optional(),
        name: updateName.optional(),
        gender: z.enum(["male", "female"]).optional(),
        email: z.string().min(1).email().optional(),
        Mobile: z.string().min(1).optional(),
        guardian: updateGuardian.optional(),
        LocalGuardian: updateLocalGuardian.optional(), 
        admissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
    })
});

export const StudentValidationSchema = 
{
    StudentSchema,
    updateValidationSchema
}; 