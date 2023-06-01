import { Category } from "src/book/book.schema";


export class createBookDto{
   readonly title:string;
   readonly discription:string;
   readonly author:string;
   readonly price:number;
   readonly category:Category;
}