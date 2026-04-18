import './Step3.css';

interface Step3Props {
  name: string;
  email: string;
  topics: string[];
  onConfirm: () => void;
}

export default function Step3({ name, email, topics, onConfirm }: Step3Props) {
  return (
    <div className="card">
      <h1 className="card__heading">Summary</h1>
      <div className="step3__info">
        <p className="step3__row">
          <span className="step3__key">Name: </span>
          <strong className="step3__value">{name}</strong>
        </p>
        <p className="step3__row">
          <span className="step3__key">Email: </span>
          <strong className="step3__value">{email}</strong>
        </p>
        <div className="step3__topics-section">
          <span className="step3__topics-label">Topics:</span>
          <ul className="step3__topic-list">
            {topics.map(topic => (
              <li key={topic} className="step3__topic-item">
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button className="btn-primary" type="button" onClick={onConfirm}>
        Continue
      </button>
    </div>
  );
}
