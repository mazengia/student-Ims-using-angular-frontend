import {page} from './Page';

export class Status{
  id?: number;
  name: string;
}
export class StatusResponse {
  _embedded: {
    statusDTOList: Status[];
  };
  page:page;
}

