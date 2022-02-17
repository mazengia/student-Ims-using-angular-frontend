

export class Category
{
  id?:number;
  title:string;
}

export class CategoryResponse
{
  content:Category[];
  page:number;
  size:number;
  totalElements:number;
}
