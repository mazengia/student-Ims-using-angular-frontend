import {page} from './Page';
import {Student} from "./student";
import {Department} from "./department";
import {Program} from "./program";
import {ProgramType} from "./programType";


export class Dpt {
  id?: number;
  department: Department[];
  programType: ProgramType[];
  programs: Program[];
}

export class DptResponse {
  _embedded: {
    dptDTOList: Dpt[];
  };
  page: page;
}
