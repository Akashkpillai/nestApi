import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SignUp } from "./auth.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs"
import { JwtService } from "@nestjs/jwt";
import { singUpDto } from "src/dto/singUpDto.dto";

@Injectable()

export class AuthService{
    constructor(
        @InjectModel(SignUp.name)
        private userModel:Model<SignUp>,
        private jwtService:JwtService
    ){}

    async singUp(singUpDto:singUpDto):Promise<{token:string}>{
        const {name,email,password} = singUpDto

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await this.userModel.create({
            name,
            email,
            password:hashedPassword
        })
        const token = this.jwtService.sign({id:user._id})
        return {token}
    }
}