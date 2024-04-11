export interface EnrollmentProps {
  _id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  instructorId: string;
  instructorName: string;
  organizationId: string;
  studentMobileNumber: string;
  transactionType: string;
  enrollmentDate: string;
  createdAt: string;
  updatedAt: string;
  amount: number;
  isAmountPaid: boolean;
  status: boolean;
}

export interface PaymentProps {
  _id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  enrollmentsId: string;
  instructorId: string;
  organizationId: string;
  paymentDate: string;
  transactionType: string;
  transactionId: string;
  amount: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

