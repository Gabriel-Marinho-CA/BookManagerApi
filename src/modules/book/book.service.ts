import { Injectable } from '@nestjs/common';
import { BookDTO } from './book.dto';
import { PrismaService } from 'src/database/PrismaService';


@Injectable()
export class BookService {

    constructor(private prisma: PrismaService) {

    }

    async create(data: BookDTO) {
        try {
            const bookExists = await this.verifyIfBookExist(data.id);

            if (bookExists) {
                throw new Error("Book already exists");
            }

            const bookCreated = await this.prisma.book.create({
                data,
            });

            return bookCreated;
        } catch (error) {
            console.error(error);
        }
    }

    async getAll() {
        return this.prisma.book.findMany();
    }

    async update(id: string, data: BookDTO) {
        try {
            const bookExist = await this.verifyIfBookExist(id);

            if (!bookExist) {
                throw new Error("Book not exist");
            }
            return await this.prisma.book.update({
                data,
                where: {
                    id,
                }
            });
        } catch (error) {
            console.error(error);
        }

    }

    async delete(id: string) {
        try {
            const bookExist = await this.verifyIfBookExist(id);

            if (!bookExist) throw new Error("Book doesn't exists");

            return await this.prisma.book.delete({
                where: {
                    id,
                }
            });
        } catch (error) {
            console.error(error);
        }

    }

    async verifyIfBookExist(id: string) {
        const bookExists = await this.prisma.book.findFirst({
            where: {
                id,
            }
        });

        return bookExists ? true : false;
    }

}
