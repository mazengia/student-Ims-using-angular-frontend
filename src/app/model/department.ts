import {page} from './Page';

export class Department{
  id	  :string;
  name	:string;
  code	:string;

}
export  class DepartmentResponse{
  _embedded: {
    departmentDTOes: Department[];
  };
  page:page;
}
