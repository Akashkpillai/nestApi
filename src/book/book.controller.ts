import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.schema';
import { createBookDto } from 'src/dto/create-book.dto';
import { updateBookDto } from 'src/dto/update-book.dto';
import { Query as ExpressQuery } from "express-serve-static-core";
import { AuthGuard } from '@nestjs/passport';


@Controller()
export class BookController {
    constructor(private bookservice:BookService){}

    @Get()
    async getAllBooks(@Query() query:ExpressQuery):Promise<Book[]> {
        return this.bookservice.findAll(query)
    }

    @Post('new')
    @UseGuards(AuthGuard())
    async createBook(
        @Body()
        book:createBookDto
    ):Promise<Book>{
       return await this.bookservice.create(book)
    }

    @Get(':id')
    async getBooksByID(
        @Param('id')
        id:string
        ):Promise<Book> {
        return this.bookservice.findBookById(id)
    }

    @Put(':id')
    async updateById(
        @Param('id')
        id:string,
        @Body()
        book:updateBookDto
    ){
        return this.bookservice.updateBookById(id,book)
    }
    @Delete(':id')
    async deletebyId(@Param('id')id:string){
        await this.bookservice.deleteBookById(id)
        return {message:"The book is deleted"}
    }
}
