import { Prop, Schema } from "@nestjs/mongoose";

@Schema({
    timestamps:true
})

export class SignUp{   
    @Prop()
    name:String

    @Prop()
    email:String


    @Prop()
    Password:String

}