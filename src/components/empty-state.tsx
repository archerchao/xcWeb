interface EmptyStateProps {
  text: string;
  className?: string;
}

export default function EmptyState({ text, className = "" }: EmptyStateProps) {
  return (
    <div className={`rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-zinc-500 ${className}`}>
      {text}
    </div>
  );
}
