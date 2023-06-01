import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Book } from "./book.schema";
import * as mongoose from "mongoose";

@Injectable()

export class BookService{
    constructor(
        @InjectModel(Book.name)
        private bookModel:mongoose.Model<Book>
    ){}


    async findAll():Promise<Book[]> {
        const book = await this.bookModel.find()
        return book;
    }

    async create(book:Book): Promise<Book> {
        const res = await this.bookModel.create(book)
        return res;
    }
    async findBookById(id:string) : Promise<Book>{
        const book = await this.bookModel.findById(id)
        if(!book){
            throw new NotFoundException("Book not found")
        }
        return book
    }

    async updateBookById(id:string,book:Book){
       const res = await this.bookModel.findByIdAndUpdate(id,book,{
        new:true,
        runValidators:true
       })
       if(!res){
        throw new NotFoundException("Please check the Id")
       }
       return res;
    }

    async deleteBookById(id:string):Promise<Book>{
    const res = await this.bookModel.findByIdAndDelete(id)
    if(!res){
        throw new NotFoundException("There is no book to deleted")
    }
    return res
    }
}