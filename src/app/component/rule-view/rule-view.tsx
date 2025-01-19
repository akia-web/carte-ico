'use client'
import { RulesDto } from '@/app/interfaces/rules.dto';
import { Card } from 'primereact/card';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

type RulesSortableProps = {
  rule: RulesDto
}

export default function RuleView({ rule }: RulesSortableProps) {
  const [safeHtmlMessage, setSafeHtmlMessage] = useState('')
  const [safeHtmlTitle, setSafeHtmlTitle] = useState('')
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: rule.id
  });

  useEffect(() => {
    setSafeHtmlTitle(DOMPurify.sanitize(rule.title))
    setSafeHtmlMessage(DOMPurify.sanitize(rule.message))
  }, []);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  return (
    <div ref={setNodeRef}
         style={style}
         {...attributes}
         {...listeners}>
      <Card className="mt-2">
        <h1 dangerouslySetInnerHTML={{ __html: safeHtmlTitle }} className="font-normal"></h1>
        <p dangerouslySetInnerHTML={{ __html: safeHtmlMessage }} className="font-normal"></p>
      </Card>
    </div>

  );
}