import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "src/book/book.schema";


export class createBookDto{
   @IsNotEmpty()
   @IsString()
   readonly title:string;

   @IsNotEmpty()
   @IsString()
   readonly discription:string;

   @IsNotEmpty()
   @IsString()
   readonly author:string;

   @IsNotEmpty()
   @IsNumber()
   readonly price:number;

   @IsNotEmpty()
   @IsEnum(Category,{message:"Please choose the category"})
   readonly category:Category;
}