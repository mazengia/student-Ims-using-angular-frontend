import {Department} from './department';
import {page} from './Page';

export class Course{
  id?: number;
  name: string;
  code:string;
  creditHour:number;
  ects:  number;
  department:Department[];
}
export class CourseResponse {
  _embedded: {
    courseDTOes: Course[];
  };
  page:page;
}

