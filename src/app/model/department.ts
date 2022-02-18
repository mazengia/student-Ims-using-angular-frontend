 import {page} from './Page';
 import {Roles} from "./Roles";

export class Department{
  id	  :string;
  code	:string;
  name	:string;

}
export  class DepartmentResponse{
  _embedded: {
    departmentDTOList: Department[];
  };
  page:page;
}
