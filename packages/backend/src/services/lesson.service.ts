import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Lesson, LessonDocument } from "src/schemas/lesson.schema";
import { CloudinaryService } from "./cloudinary.service";
import { Readable } from "stream";

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson.name) private lessonModel: Model<LessonDocument>,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async create(lesson: Lesson): Promise<Lesson> {
    await this.checkLessonNameNotExists(lesson.name, lesson.sectionId);
    if (lesson.thumbnail) {
      const thumbnailStream = new Readable();
      thumbnailStream.push(Buffer.from(lesson.thumbnail, "base64"));
      thumbnailStream.push(null);

      const thumbnailUrl = await this.cloudinaryService.uploadImage(
        thumbnailStream
      );
      lesson.thumbnail = thumbnailUrl;
    }
    const createdLesson = new this.lessonModel(lesson);
    return createdLesson.save();
  }

  async edit(lessonId: string, updatedLesson: Lesson): Promise<Lesson> {
    await this.checkLessonNameNotExists(
      updatedLesson.name,
      updatedLesson.sectionId,
      lessonId
    );
    if (!updatedLesson.thumbnail?.startsWith("https")) {
      const thumbnailStream = new Readable();
      thumbnailStream.push(Buffer.from(updatedLesson.thumbnail, "base64"));
      thumbnailStream.push(null);

      const thumbnailUrl = await this.cloudinaryService.uploadImage(
        thumbnailStream
      );
      updatedLesson.thumbnail = thumbnailUrl;
    }
    const existingLesson = await this.lessonModel
      .findByIdAndUpdate(lessonId, updatedLesson, {
        new: true,
      })
      .exec();

    if (!existingLesson) {
      throw new NotFoundException(`Lesson with ID ${lessonId} not found`);
    }
    return existingLesson;
  }

  async getAll(): Promise<Lesson[]> {
    return this.lessonModel.find().exec();
  }

  async getById(lessonId: string): Promise<Lesson> {
    const lesson = await this.lessonModel.findById(lessonId).exec();
    if (!lesson) {
      throw new NotFoundException(`Lesson with id ${lessonId} not found`);
    }
    return lesson;
  }

  async getBySectionId(sectionId: string): Promise<Lesson[]> {
    const lessons = await this.lessonModel.find({ sectionId }).exec();
    if (!lessons) {
      return null;
    }
    return lessons;
  }

  async getSectionById(sectionId: string): Promise<Lesson[]> {
    return this.lessonModel.find({ sectionId, isActive: true }).exec();
  }

  async delete(lessonId: string): Promise<void> {
    await this.getById(lessonId);
    await this.lessonModel.findByIdAndDelete(lessonId).exec();
  }

  private async checkLessonNameNotExists(
    name: string,
    sectionId: any,
    excludedLessonId?: string
  ): Promise<void> {
    const existingLesson = await this.lessonModel
      .findOne({ name, sectionId, _id: { $ne: excludedLessonId } })
      .exec();

    if (existingLesson) {
      throw new ConflictException(
        `Lesson ${name} already exists for the given section`
      );
    }
  }

  async getTotalLessons(): Promise<number> {
    const total = await this.lessonModel.countDocuments();
    return total;
  }
}
