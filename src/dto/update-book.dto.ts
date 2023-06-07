import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Category } from "src/book/book.schema";


export class updateBookDto{
   @IsString()
   @IsOptional()
   readonly title:string;

   @IsString()
   @IsOptional()
   readonly discription:string;

   @IsString()
   @IsOptional()
   readonly author:string;

   @IsNumber()
   @IsOptional()
   readonly price:number;

   @IsEnum(Category,{message:"Please Choose a valid category"})
   @IsOptional()
   readonly category:Category;
}