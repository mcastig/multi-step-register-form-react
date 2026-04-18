import { useState } from 'react';
import TopicCard from '../TopicCard/TopicCard';
import './Step2.css';

const TOPICS = ['Software Development', 'User Experience', 'Graphic Design'];

interface Step2Props {
  initialTopics: string[];
  onContinue: (topics: string[]) => void;
}

export default function Step2({ initialTopics, onContinue }: Step2Props) {
  const [selected, setSelected] = useState<Set<string>>(() => new Set(initialTopics));
  const [error, setError] = useState('');

  function toggleTopic(topic: string) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(topic)) {
        next.delete(topic);
      } else {
        next.add(topic);
      }
      return next;
    });
    if (error) setError('');
  }

  function handleContinue() {
    if (selected.size === 0) {
      setError('Please select at least one topic to continue');
      return;
    }
    onContinue([...selected]);
  }

  return (
    <div className="card">
      <h1 className="card__heading">Which topics you are interested in?</h1>
      <div className="step2__topics">
        {TOPICS.map(topic => (
          <TopicCard
            key={topic}
            label={topic}
            selected={selected.has(topic)}
            onClick={() => toggleTopic(topic)}
          />
        ))}
        {error ? (
          <span className="step2__error" role="alert">
            {error}
          </span>
        ) : null}
      </div>
      <button className="btn-primary" type="button" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
}
