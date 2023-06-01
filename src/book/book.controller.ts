import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.schema';
import { createBookDto } from 'src/dto/create-book.dto';
import { updateBookDto } from 'src/dto/update-book.dto';

@Controller('book')
export class BookController {
    constructor(private bookservice:BookService){}

    @Get()
    async getAllBooks():Promise<Book[]> {
        return this.bookservice.findAll()
    }

    @Post('new')
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
