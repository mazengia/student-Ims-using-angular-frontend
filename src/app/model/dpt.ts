import {page} from './Page';
import {Department} from "./department";
import {Certification} from "./certification";
import {ProgramType} from "./programType";


export class Dpt {
  id?: number;
  department: Department[];
  programs: ProgramType[];
  certifications: Certification[];
}

export class DptResponse {
  _embedded: {
    dptDTOes: Dpt[];
  };
  page: page;
}
