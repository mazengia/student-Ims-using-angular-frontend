import {page} from './Page';


export class Dpt
{
  id?:number;
}

export class DptResponse
{
  content:Dpt[];
  page:page;
}
