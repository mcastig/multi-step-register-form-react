import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Step2 from './Step2';

function renderStep2(onContinue = vi.fn(), initialTopics: string[] = []) {
  return render(<Step2 initialTopics={initialTopics} onContinue={onContinue} />);
}

describe('Step2', () => {
  it('renders the heading', () => {
    renderStep2();
    expect(screen.getByText(/which topics/i)).toBeInTheDocument();
  });

  it('renders all three topic buttons', () => {
    renderStep2();
    expect(screen.getByRole('button', { name: 'Software Development' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'User Experience' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Graphic Design' })).toBeInTheDocument();
  });

  it('marks initially selected topics as pressed', () => {
    renderStep2(vi.fn(), ['User Experience']);
    expect(screen.getByRole('button', { name: 'User Experience' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Software Development' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('toggles topic on click', async () => {
    renderStep2();
    const btn = screen.getByRole('button', { name: 'Graphic Design' });
    await userEvent.click(btn);
    expect(btn).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(btn);
    expect(btn).toHaveAttribute('aria-pressed', 'false');
  });

  it('shows error when Continue clicked with no selection', async () => {
    renderStep2();
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByRole('alert')).toHaveTextContent(/select at least one/i);
  });

  it('clears error when a topic is selected after error', async () => {
    renderStep2();
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(screen.getByRole('alert')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'User Experience' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('calls onContinue with selected topics array', async () => {
    const onContinue = vi.fn();
    renderStep2(onContinue);
    await userEvent.click(screen.getByRole('button', { name: 'Software Development' }));
    await userEvent.click(screen.getByRole('button', { name: 'Graphic Design' }));
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(onContinue).toHaveBeenCalledTimes(1);
    const [topics] = onContinue.mock.calls[0];
    expect(topics).toContain('Software Development');
    expect(topics).toContain('Graphic Design');
    expect(topics).toHaveLength(2);
  });

  it('does not call onContinue when no topics selected', async () => {
    const onContinue = vi.fn();
    renderStep2(onContinue);
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(onContinue).not.toHaveBeenCalled();
  });

  it('pre-selects multiple initial topics', () => {
    renderStep2(vi.fn(), ['Software Development', 'Graphic Design']);
    expect(screen.getByRole('button', { name: 'Software Development' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Graphic Design' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'User Experience' })).toHaveAttribute('aria-pressed', 'false');
  });
});
