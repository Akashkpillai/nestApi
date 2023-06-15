import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { singUpDto } from "src/dto/singUpDto.dto";
import { loginDto } from "src/dto/login.dto";

@Controller('auth')
export class AuthControler{
    constructor(private authService:AuthService){}

    @Post('signup')
    singup(@Body() singup:singUpDto):Promise<{token:string}>{
        return this.authService.singUp(singup);
    }

    @Post('signin')
    singin(@Body() singin:loginDto):Promise<{user:object,token:string}>{
        return this.authService.signIn(singin)
    }
}