 import {page} from './Page';

export class Department{
  id	  :string;
  name	:string;
  code	:string;

}
export  class DepartmentResponse{
  _embedded: {
    departmentDTOList: Department[];
  };
  page:page;
}
