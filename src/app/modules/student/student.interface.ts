
export type guardian =
{
    father:string;
    mother:string;
    fatherMob:number;
    motherMob:number;
};

export type LocalGuardian =
{
    name:string;
    address:string;
    mobile:string;
};

export type Username =
{
    firstName:string;
    lastName:string;  
};

export type Student =
 {
    name:Username, 
    id: string,
    gender: "male" |"female",
    email:string,
    guardian:guardian, 
    LocalGuardian:LocalGuardian;
    Mobile:string;
  }