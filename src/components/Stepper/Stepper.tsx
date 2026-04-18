import './Stepper.css';

interface StepperProps {
  current: number;
  total: number;
}

export default function Stepper({ current, total }: StepperProps) {
  return (
    <div className="stepper" role="status" aria-label={`Step ${current} of ${total}`}>
      <span className="stepper__label">Step {current} of {total}</span>
      <div className="stepper__dots" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`stepper__dot${i + 1 === current ? ' stepper__dot--active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
