import { FeedbackDto } from '@/app/interfaces/feedback.dto';
import { StatusFeedbackEnum } from '@/app/enum/status-feedback.enum';

export interface FeedBackStatusProps {
  onChangeAction: (change:{id:number, status: StatusFeedbackEnum }) => void;
  feedBack: FeedbackDto;
  classes?: string;
}

