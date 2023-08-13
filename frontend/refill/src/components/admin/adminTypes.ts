export enum Role {
  MEMBER = "MEMBER",
  HOSPITAL = "HOSPITAL",
}

export interface WaitingHospitalResponse {
  id: number;
  loginId: string;
  name: string;
  address: string;
  tel: string;
  email: string;
  hospitalProfileImg: string;
  registrationImg: string;
}

export interface ReviewResponse {
  reviewId: number;
  score: number;
  content: string;
  memberId: number;
  nickname: string;
  doctorId: number;
  doctorName: string;
  hospitalId: number;
  hospitalName: string;
  updateDate: string;
  category: string;
}

export interface ReportReviewResponse {
  reportId: number;
  reviewResponse: ReviewResponse;
  reporterType: Role;
  reporterId: number;
  reporterName: string;
  content: string;
}
