import { Module } from "@nestjs/common";
import { AuthControler } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MongooseModule } from "@nestjs/mongoose";
import { userSchema } from "./auth.schema";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { config } from "process";

@Module({
    imports:[
        PassportModule.register({defaultStrategy:"jwt"}),
        JwtModule.registerAsync({
            inject:[ConfigService],
            useFactory:(config:ConfigService)=>{
                return{
                    secret:config.get<string>('JWT_SECERT'),
                    signOptions:{
                        expiresIn:config.get<string | number>('JWT_EXPIRE')
                    }
                }
            }
        }),
        MongooseModule.forFeature([{name:"SignUp",schema:userSchema}])
    ],
    controllers:[AuthControler],
    providers:[AuthService]
})

export class AuthModule{};