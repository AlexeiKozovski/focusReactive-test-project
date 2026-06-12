import { type ReactNode } from 'react';

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function highlightText(value: string, term: string): ReactNode {
  const normalizedTerm = term.trim();
  if (!normalizedTerm) {
    return value;
  }

  const pattern = new RegExp(`(${escapeRegex(normalizedTerm)})`, 'ig');
  const parts = value.split(pattern);

  return parts.map((part, index) =>
    part.toLowerCase() === normalizedTerm.toLowerCase() ? (
      <mark key={`${part}-${index}`}>{part}</mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    )
  );
}
