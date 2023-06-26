import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import {Strategy,ExtractJwt} from 'passport-jwt'
import { SignUp } from "./auth.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(SignUp.name)
        private userModel:Model<SignUp>
    ){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrkey : process.env.JWT_SECERT
        })
    }

    async validate(paylod){
        const {id} = paylod;
        const user = await this.userModel.findById(id)

        if(!user){
            throw new UnauthorizedException('Need login');
        }
        return user;
    }
}