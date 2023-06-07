import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Book } from "./book.schema";
import * as mongoose from "mongoose";
import {Query} from "express-serve-static-core";


@Injectable()

export class BookService{
    constructor(
        @InjectModel(Book.name)
        private bookModel:mongoose.Model<Book>
    ){}


    async findAll(query:Query):Promise<Book[]> {
        const resPerPage = 2
        const currentPage = Number(query.page) || 1
        const skip = resPerPage*(currentPage - 1)
        const keyword = query.keyword ? {
            title: {
                $regex:query.keyword,
                $options:'i'
            }
        }:{}
        const book = await this.bookModel.find({...keyword}).limit(resPerPage).skip(skip)
        return book;
    }

    async create(book:Book): Promise<Book> {
        const res = await this.bookModel.create(book)
        return res;
    }
    async findBookById(id:string) : Promise<Book>{
        const isValidId = mongoose.isValidObjectId(id)
        if(!isValidId){
            throw new BadRequestException("Please enter a valid Id")
        }
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