import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Category, CategoryDocument } from "src/schemas/category.schema";
import { CategoryService } from "src/services/category.service";

@ApiTags("Categories")
@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  async create(@Body() category: Category): Promise<Category> {
    return this.categoryService.create(category);
  }

  @Get('get-all')
  async getAll(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get("get-by-id/:id")
  async getById(@Param("id") id: string): Promise<CategoryDocument> {
    return this.categoryService.getCategoryById(id);
  }

  @Get("status/:status")
  async getByStatus(@Param("status") status: boolean): Promise<Category[]> {
    return this.categoryService.getAllCategoriesByStatus(status);
  }

  @Put("edit/:id")
  async update(
    @Param("id") id: string,
    @Body() updatedCategory: Category
  ): Promise<Category> {
    try {
      return this.categoryService.update(id, updatedCategory);      
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(`Category with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }

  @Delete("delete/:id")
  async delete(@Param("id") id: string): Promise<void> {
    return this.categoryService.delete(id);
  }
}
