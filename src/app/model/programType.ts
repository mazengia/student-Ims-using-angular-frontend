import {page} from './Page';

export class ProgramType{
  id?: number;
  name: string;
}
export class ProgramTypeResponse {
  _embedded: {
    programDTOes: ProgramType[];
  };
  page:page;
}

