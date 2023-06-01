import { Category } from "src/book/book.schema";


export class updateBookDto{
   readonly title:string;
   readonly discription:string;
   readonly author:string;
   readonly price:number;
   readonly category:Category;
}