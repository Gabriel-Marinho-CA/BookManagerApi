import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { BookDTO } from './book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post()
  async create(@Body() data: BookDTO) {
    return this.bookService.create(data);
  }

  @Get()
  async getAll() {
    return this.bookService.getAll();
  }

  @Put(":id")
  async updateBook(@Param("id") id: string, @Body() data: BookDTO) {
    return this.bookService.update(id, data);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.bookService.delete(id);
  }
}
