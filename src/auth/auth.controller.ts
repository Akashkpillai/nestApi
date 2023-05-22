import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthControler{
    constructor(private authService:AuthService){}

    @Post('signup')
    singup(){
        return "I am singup"
    }

    @Post('signin')
    singin(){
        return 'I am singin'
    }
}