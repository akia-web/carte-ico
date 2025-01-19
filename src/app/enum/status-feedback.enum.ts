export enum StatusFeedbackEnum {
  UNTREATED = 'untreated',
  IN_PROGRESS = 'in_progress',
  TREATED = 'treated'
}

export const traductionStatus = (value: StatusFeedbackEnum) => {
  switch (value){
    case StatusFeedbackEnum.IN_PROGRESS:
      return 'En cours';
    case StatusFeedbackEnum.TREATED:
      return 'Traité'
    case StatusFeedbackEnum.UNTREATED:
      return 'Non traité'
  }
}