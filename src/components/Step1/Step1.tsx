import { useState } from 'react';
import FormInput from '../FormInput/FormInput';
import './Step1.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Step1Props {
  initialName: string;
  initialEmail: string;
  onContinue: (name: string, email: string) => void;
}

export default function Step1({ initialName, initialEmail, onContinue }: Step1Props) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [errors, setErrors] = useState({ name: '', email: '' });

  function handleNameChange(value: string) {
    setName(value);
    if (errors.name) setErrors(e => ({ ...e, name: '' }));
  }

  function handleEmailChange(value: string) {
    setEmail(value);
    if (errors.email) setErrors(e => ({ ...e, email: '' }));
  }

  function handleContinue() {
    const nameErr = name.trim() ? '' : 'Name is required';

    let emailErr = '';
    if (!email.trim()) {
      emailErr = 'Email is required';
    } else if (!EMAIL_RE.test(email.trim())) {
      emailErr = 'Please enter a valid email address';
    }

    if (nameErr || emailErr) {
      setErrors({ name: nameErr, email: emailErr });
      return;
    }

    onContinue(name.trim(), email.trim());
  }

  return (
    <div className="card">
      <h1 className="card__heading">Register</h1>
      <div className="step1__fields">
        <FormInput
          id="register-name"
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
          error={errors.name}
        />
        <FormInput
          id="register-email"
          label="Email"
          type="email"
          placeholder="Example@gmail.com"
          value={email}
          onChange={handleEmailChange}
          error={errors.email}
        />
      </div>
      <button className="btn-primary" type="button" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
}
