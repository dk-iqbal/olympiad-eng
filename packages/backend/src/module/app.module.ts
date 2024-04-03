require("dotenv").config({ path: ".env" });
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategorySchema } from "src/schemas/category.schema";
import { UserSchema } from "src/schemas/user.schema";
import { UserController } from "src/controllers/user.controller";
import { UserService } from "src/services/user.service";
import { CategoryController } from "src/controllers/category.controller";
import { CategoryService } from "src/services/category.service";
import { CourseSchema } from "src/schemas/course.schema";
import { CourseService } from "src/services/course.service";
import { CourseController } from "src/controllers/course.controller";
import { SectionSchema } from "src/schemas/section.schema";
import { SectionController } from "src/controllers/section.controller";
import { SectionService } from "src/services/section.service";
import { LessonSchema } from "src/schemas/lesson.schema";
import { LessonController } from "src/controllers/lesson.controller";
import { LessonService } from "src/services/lesson.service";
import { QuestionSchema } from "src/schemas/question.schema";
import { QuestionController } from "src/controllers/question.controller";
import { QuestionService } from "src/services/question.service";
import { AssignmentSchema } from "src/schemas/assignment.schema";
import { AssignmentController } from "src/controllers/assignment.controller";
import { AssignmentService } from "src/services/assignment.service";
import { FeedbackSchema } from "src/schemas/feedback.schema";
import { FeedbackController } from "src/controllers/feedback.controller";
import { FeedbackService } from "src/services/feedback.service";
import { UploadModule } from "./file.module";
import { CourseDetailsController } from "src/controllers/courseDetails.controller";
import { CourseDetailsService } from "src/services/courseDetails.service";
import { QuestionMarksSchema } from "src/schemas/questionMarks.schema";
import { QuestionMarksController } from "src/controllers/questionMarks.controller";
import { QuestionMarksService } from "src/services/questionMarks.service";
import { EnrollmentsSchema } from "src/schemas/enrollments.schema";
import { CourseProgressSchema } from "src/schemas/courseProgress.schema";
import { PaymentSchema } from "src/schemas/payment.schema";
import { EnrollmentsController } from "src/controllers/enrollments.controller";
import { CourseProgressController } from "src/controllers/courseProgress.controller";
import { PaymentController } from "src/controllers/payment.controller";
import { EnrollmentsService } from "src/services/enrollments.service";
import { CourseProgressService } from "src/services/courseProgress.service";
import { PaymentService } from "src/services/payment.service";
import { StudentCoursesSchema } from "src/schemas/studentCourses.schema";
import { StudentCoursesController } from "src/controllers/studentCourses.controller";
import { StudentCoursesService } from "src/services/studentCourses.service";
import { CloudinaryService } from "src/services/cloudinary.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CourseRoutineSchema } from "src/schemas/courseRoutine.schema";
import { CourseRoutineController } from "src/controllers/courseRoutine.controller";
import { CourseRoutineService } from "src/services/courseRoutine.service";

const mongo_uri = process.env.DATABASE_URL;
@Module({
  imports: [
    MongooseModule.forRoot(mongo_uri),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
      { name: "Category", schema: CategorySchema },
      { name: "Course", schema: CourseSchema },
      { name: "Section", schema: SectionSchema },
      { name: "Lesson", schema: LessonSchema },
      { name: "Question", schema: QuestionSchema },
      { name: "Assignment", schema: AssignmentSchema },
      { name: "Feedback", schema: FeedbackSchema },
      { name: "QuestionMarks", schema: QuestionMarksSchema },
      { name: "Enrollments", schema: EnrollmentsSchema },
      { name: "CourseProgress", schema: CourseProgressSchema },
      { name: "Payment", schema: PaymentSchema },
      { name: "StudentCourses", schema: StudentCoursesSchema },
      { name: "CourseRoutine", schema: CourseRoutineSchema },
    ]),
    UploadModule,
  ],
  controllers: [
    UserController,
    CategoryController,
    CourseController,
    SectionController,
    LessonController,
    QuestionController,
    AssignmentController,
    FeedbackController,
    CourseDetailsController,
    QuestionMarksController,
    EnrollmentsController,
    CourseProgressController,
    PaymentController,
    StudentCoursesController,
    CourseRoutineController,
  ],
  providers: [
    UserService,
    CategoryService,
    CourseService,
    SectionService,
    LessonService,
    QuestionService,
    AssignmentService,
    FeedbackService,
    CourseDetailsService,
    QuestionMarksService,
    EnrollmentsService,
    CourseProgressService,
    PaymentService,
    StudentCoursesService,
    CloudinaryService,
    ConfigService,
    CourseRoutineService,
  ],
})
export class AppModule {}
