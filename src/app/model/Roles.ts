import {page} from './Page';

export class Roles{
  id?: number;
  name: string;
}
export class RolesResponse {
  _embedded: {
    rolesDTOList: Roles[];
  };
  page:page;
}

