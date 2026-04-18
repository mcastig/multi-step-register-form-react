import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Step1 from './Step1';

function renderStep1(onContinue = vi.fn()) {
  return render(<Step1 initialName="" initialEmail="" onContinue={onContinue} />);
}

describe('Step1', () => {
  it('renders the Register heading', () => {
    renderStep1();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('renders Name and Email inputs', () => {
    renderStep1();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('populates fields from initial values', () => {
    render(<Step1 initialName="Bob" initialEmail="bob@test.com" onContinue={() => {}} />);
    expect(screen.getByLabelText('Name')).toHaveValue('Bob');
    expect(screen.getByLabelText('Email')).toHaveValue('bob@test.com');
  });

  it('shows name required error when name is empty', async () => {
    renderStep1();
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByText('Name is required')).toBeInTheDocument();
  });

  it('shows email required error when email is empty', async () => {
    renderStep1();
    await userEvent.type(screen.getByLabelText('Name'), 'Alice');
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('shows invalid email error for bad email format', async () => {
    renderStep1();
    await userEvent.type(screen.getByLabelText('Name'), 'Alice');
    await userEvent.type(screen.getByLabelText('Email'), 'not-an-email');
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  it('shows both errors when both fields are empty', async () => {
    renderStep1();
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('clears name error when user starts typing in name field', async () => {
    renderStep1();
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText('Name'), 'A');
    expect(screen.queryByText('Name is required')).not.toBeInTheDocument();
  });

  it('clears email error when user starts typing in email field', async () => {
    renderStep1();
    await userEvent.type(screen.getByLabelText('Name'), 'Alice');
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText('Email'), 'a');
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
  });

  it('calls onContinue with trimmed name and email on valid input', async () => {
    const onContinue = vi.fn();
    render(<Step1 initialName="" initialEmail="" onContinue={onContinue} />);
    await userEvent.type(screen.getByLabelText('Name'), '  Alice  ');
    await userEvent.type(screen.getByLabelText('Email'), 'alice@example.com');
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(onContinue).toHaveBeenCalledWith('Alice', 'alice@example.com');
  });

  it('does not call onContinue when validation fails', async () => {
    const onContinue = vi.fn();
    render(<Step1 initialName="" initialEmail="" onContinue={onContinue} />);
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(onContinue).not.toHaveBeenCalled();
  });
});
