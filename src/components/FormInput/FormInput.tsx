import './FormInput.css';

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function FormInput({
  id,
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
}: FormInputProps) {
  return (
    <div className="form-input">
      <label className="form-input__label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={`form-input__field${error ? ' form-input__field--error' : ''}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        autoComplete="off"
        spellCheck={false}
      />
      {error ? (
        <span className="form-input__error" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
