
import {Department} from './department';


export  class Employee{
  department:Department[]
  employeeId	:string
  firstName	:string
  id?:number
  lastName	:string
  middleName	:string
}
export class EmployeeResponse{
  content: Employee[];
  page:number;
  size:number;
  totalElements:number;
}
