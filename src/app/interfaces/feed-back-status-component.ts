import { FeedBackDto } from '@/app/interfaces/feed-back.dto';
import { StatusFeedbackEnum } from '@/app/enum/status-feedback.enum';

export interface FeedBackStatusProps {
  onChangeAction: (change:{id:number, status: StatusFeedbackEnum }) => void;
  feedBack: FeedBackDto;
  classes?: string;
}

