import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Category, CategoryDocument } from "src/schemas/category.schema";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>
  ) {}

  async create(category: Category): Promise<Category> {
    const existingCategory = await this.categoryModel
      .findOne({ name: category.name })
      .exec();
    if (existingCategory) {
      throw new ConflictException("Category name already exists");
    }

    const createdCategory = new this.categoryModel(category);
    return createdCategory.save();
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async getAllCategoriesByStatus(status: boolean): Promise<Category[]> {
    return this.categoryModel.find({ status }).exec();
  }

  async getCategoryById(id: string): Promise<CategoryDocument> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException("Category not found");
    }
    return category as CategoryDocument;
  }

  async update(id: string, updatedCategory: Category): Promise<Category> {
    const existingCategory = await this.categoryModel
      .findOne({ name: updatedCategory.name, _id: { $ne: id } })
      .exec();
    if (existingCategory) {
      throw new ConflictException("Category name already exists");
    }
    const updateCagetory = await this.categoryModel
      .findByIdAndUpdate(id, updatedCategory, { new: true })
      .exec();
    if (!updateCagetory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return updateCagetory;
  }

  async delete(id: string): Promise<void> {
    const deletedCategory = await this.categoryModel
      .findOneAndDelete({ _id: id })
      .exec();

    if (!deletedCategory) {
      throw new NotFoundException("Category not found");
    }
  }
}
