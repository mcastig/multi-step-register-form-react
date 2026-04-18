import './SuccessModal.css';

interface SuccessModalProps {
  onClose: () => void;
}

export default function SuccessModal({ onClose }: SuccessModalProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-card__icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="url(#grad)" />
            <path
              d="M9 16.5l4.5 4.5 9-9"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5425af" />
                <stop offset="1" stopColor="#845eee" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h2 className="modal-card__title">Registration Complete</h2>
        <p className="modal-card__body">
          You're all set! Your registration has been submitted successfully.
        </p>
        <button className="btn-primary" type="button" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}
