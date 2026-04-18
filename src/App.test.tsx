import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

async function fillStep1(name = 'Alice', email = 'alice@example.com') {
  await userEvent.type(screen.getByLabelText('Name'), name);
  await userEvent.type(screen.getByLabelText('Email'), email);
  await userEvent.click(screen.getByRole('button', { name: /continue/i }));
}

async function fillStep2(topics = ['User Experience']) {
  for (const topic of topics) {
    await userEvent.click(screen.getByRole('button', { name: topic }));
  }
  await userEvent.click(screen.getByRole('button', { name: /continue/i }));
}

describe('App', () => {
  it('starts on step 1 with Register heading', () => {
    render(<App />);
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('shows Step 1 of 3 in stepper initially', () => {
    render(<App />);
    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
  });

  it('advances to step 2 after valid step 1 submission', async () => {
    render(<App />);
    await fillStep1();
    expect(screen.getByText(/which topics/i)).toBeInTheDocument();
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
  });

  it('advances to step 3 after step 2 submission', async () => {
    render(<App />);
    await fillStep1();
    await fillStep2();
    expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(screen.getByText('Step 3 of 3')).toBeInTheDocument();
  });

  it('carries name and email through to summary', async () => {
    render(<App />);
    await fillStep1('Bob', 'bob@test.com');
    await fillStep2();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('bob@test.com')).toBeInTheDocument();
  });

  it('carries topics through to summary', async () => {
    render(<App />);
    await fillStep1();
    await fillStep2(['Software Development', 'Graphic Design']);
    expect(screen.getByText('Software Development')).toBeInTheDocument();
    expect(screen.getByText('Graphic Design')).toBeInTheDocument();
  });

  it('shows success modal after confirming on step 3', async () => {
    render(<App />);
    await fillStep1();
    await fillStep2();
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByText('Registration Complete')).toBeInTheDocument();
  });

  it('closes success modal when Done is clicked', async () => {
    render(<App />);
    await fillStep1();
    await fillStep2();
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    await userEvent.click(screen.getByRole('button', { name: /done/i }));
    expect(screen.queryByText('Registration Complete')).not.toBeInTheDocument();
  });

  it('does not show modal on initial render', () => {
    render(<App />);
    expect(screen.queryByText('Registration Complete')).not.toBeInTheDocument();
  });

  it('does not advance from step 1 without valid input', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByText('Register')).toBeInTheDocument();
  });
});
