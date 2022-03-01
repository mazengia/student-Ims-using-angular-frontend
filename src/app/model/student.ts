import {page} from "./Page";
export class Student
{
      id?:number;
      firstName:string;
      lastName:string;
      username:string;
      email:string;
      password:string;
}

export class StudentResponse
{
  _embedded: {
    studentDTOList: Student[];
  };
  page:page;
}
