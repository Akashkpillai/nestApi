import {  IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class loginDto{

   @IsNotEmpty()
   @IsEmail({},{message:"Please enter valid email"})
   readonly email:string;

   @IsNotEmpty()
   @IsString()
   @MinLength(6)
   readonly password:string;

}