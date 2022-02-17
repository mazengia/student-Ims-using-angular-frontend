 import {page} from './Page';

export class Department{
  id	  :string;
  code	:string;
  name	:string;

}
export  class DepartmentResponse{
  _embedded: Department;
  page:page;
}
