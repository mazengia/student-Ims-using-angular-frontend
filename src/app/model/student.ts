import {page} from "./Page";
import {Dpt} from "./dpt";

export class Student {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  dpt:Dpt;
}

export class StudentResponse {
  _embedded: {
    userDtoes: Student[];
  };
  page: page;
}
