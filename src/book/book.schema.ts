import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Category {
    ADVENTURE = "Adventure",
    CLASSICS = "Classics",
    CRIME = "Crime",
    SI_FI = "Si-Fi"
}

@Schema({
    timestamps:true
})

export class Book {
    @Prop()
    title:string

    @Prop()
    discription:string

    @Prop()
    author:string

    @Prop()
    price:number

    @Prop()
    category:Category
}

export const BookSchema = SchemaFactory.createForClass(Book)