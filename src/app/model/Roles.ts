import {page} from './Page';

export class Roles{
  id?: number;
  name: string;
}
export class RolesResponse {
  _embedded: {
    rolesDTOes: Roles[];
  };
  page:page;
}

