import {page} from './Page';

export class Program{
  id?: number;
  name: string;
}
export class ProgramResponse {
  _embedded: {
    programDTOList: Program[];
  };
  page:page;
}

