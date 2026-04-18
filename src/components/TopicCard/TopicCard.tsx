import './TopicCard.css';

interface TopicCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function TopicCard({ label, selected, onClick }: TopicCardProps) {
  return (
    <button
      type="button"
      className={`topic-card${selected ? ' topic-card--selected' : ''}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}
