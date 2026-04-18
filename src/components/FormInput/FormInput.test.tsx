import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormInput from './FormInput';

describe('FormInput', () => {
  it('renders label and input', () => {
    render(<FormInput id="test" label="Name" value="" onChange={() => {}} />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('associates label with input via id', () => {
    render(<FormInput id="my-input" label="Email" value="" onChange={() => {}} />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'my-input');
  });

  it('renders with given value', () => {
    render(<FormInput id="test" label="Name" value="Alice" onChange={() => {}} />);
    expect(screen.getByLabelText('Name')).toHaveValue('Alice');
  });

  it('calls onChange with input value', async () => {
    const handleChange = vi.fn();
    render(<FormInput id="test" label="Name" value="" onChange={handleChange} />);
    await userEvent.type(screen.getByLabelText('Name'), 'Bob');
    expect(handleChange).toHaveBeenCalledWith('B');
  });

  it('renders placeholder', () => {
    render(<FormInput id="test" label="Name" value="" onChange={() => {}} placeholder="Enter name" />);
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
  });

  it('renders error message and alert role when error provided', () => {
    render(<FormInput id="test" label="Name" value="" onChange={() => {}} error="Required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  it('applies error class to input when error provided', () => {
    render(<FormInput id="test" label="Name" value="" onChange={() => {}} error="Bad" />);
    expect(screen.getByLabelText('Name')).toHaveClass('form-input__field--error');
  });

  it('does not render error element when no error', () => {
    render(<FormInput id="test" label="Name" value="" onChange={() => {}} />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('defaults type to text', () => {
    render(<FormInput id="test" label="Name" value="" onChange={() => {}} />);
    expect(screen.getByLabelText('Name')).toHaveAttribute('type', 'text');
  });

  it('uses provided type', () => {
    render(<FormInput id="test" label="Email" type="email" value="" onChange={() => {}} />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
  });
});
