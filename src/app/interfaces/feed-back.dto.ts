import { FeedbackEnum } from '@/app/enum/feedback.enum';
import { StatusFeedbackEnum } from '@/app/enum/status-feedback.enum';

export interface FeedBackDto {
  id: number,
  created_at: Date;
  email: string;
  message: string,
  type: FeedbackEnum,
  status: StatusFeedbackEnum
}