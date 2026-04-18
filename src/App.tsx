import { useState, useCallback } from 'react';
import Step1 from './components/Step1/Step1';
import Step2 from './components/Step2/Step2';
import Step3 from './components/Step3/Step3';
import Stepper from './components/Stepper/Stepper';
import SuccessModal from './components/SuccessModal/SuccessModal';
import './App.css';

interface FormData {
  name: string;
  email: string;
  topics: string[];
}

const TOTAL_STEPS = 3;

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    topics: [],
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const goToStep2 = useCallback((name: string, email: string) => {
    setFormData(prev => ({ ...prev, name, email }));
    setStep(2);
  }, []);

  const goToStep3 = useCallback((topics: string[]) => {
    setFormData(prev => ({ ...prev, topics }));
    setStep(3);
  }, []);

  const handleConfirm = useCallback(() => {
    setShowSuccess(true);
  }, []);

  return (
    <div className="app">
      <div className="app__blur" />
      <div className="app__content">
        {step === 1 ? (
          <Step1
            initialName={formData.name}
            initialEmail={formData.email}
            onContinue={goToStep2}
          />
        ) : step === 2 ? (
          <Step2
            initialTopics={formData.topics}
            onContinue={goToStep3}
          />
        ) : (
          <Step3
            name={formData.name}
            email={formData.email}
            topics={formData.topics}
            onConfirm={handleConfirm}
          />
        )}
        <Stepper current={step} total={TOTAL_STEPS} />
      </div>
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </div>
  );
}
