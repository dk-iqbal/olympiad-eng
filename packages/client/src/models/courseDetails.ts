export interface Questions {
  _id: string;
  questionName: string;
  answerOptions: OptionsType[];
  correctAnswer: string;
  lessonId: string;
  lessonName: string;
}
export interface Lesson {
  id?: string;
  name?: string;
  thumbnail?: string;
  duration?: number;
  lessonURL?: string;
  questions?: Questions[];
  isFree?: boolean;
  isAuthUser?: boolean;
  isActive?: boolean;
}

export interface Sections {
  id: string;
  courseId: string;
  name: string;
  lessons: Lesson[];
  positions: number;
  isExpand?: boolean;
}

interface OptionsType {
  answer: string;
  isAnswer: boolean;
  checked: boolean;
}

export interface LessonDescription {
  id?: string;
  name?: string;
  info?: string;
  thumbnail?: string;
  duration?: string;
  lessonURL?: string;
  passingMarks?: number;
  isNegativeMarks?: boolean;
  negativeMarks?: number;
  questions?: Questions[];
  assignments?: any;
  isFree?: boolean;
  isAuthUser?: boolean;
  isActive?: boolean;
}
