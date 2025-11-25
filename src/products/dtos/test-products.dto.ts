import { IsEmail, IsString, MinLength } from 'class-validator';

export class TestProductsDto {
    @IsString()
    name: string;
    @IsString()
    description: string;
    @IsString()
    price: string;
    @IsString()
    image: string;
    @IsString()
    category: string;
    @IsString()
    subcategory: string;
}