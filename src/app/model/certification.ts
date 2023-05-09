import {page} from './Page';

export class Certification {
  id?: number;
  name: string;
}
export class CertificationResponse {
  _embedded: {
    certificationDTOes: Certification[];
  };
  page:page;
}

