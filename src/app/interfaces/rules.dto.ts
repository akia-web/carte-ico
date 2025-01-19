import { UniqueIdentifier } from '@dnd-kit/core';

export interface RulesDto {
  id: UniqueIdentifier;
  created_at: Date;
  title: string;
  message: string;
  order: number;
}