import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SuccessModal from './SuccessModal';

describe('SuccessModal', () => {
  it('renders the title', () => {
    render(<SuccessModal onClose={() => {}} />);
    expect(screen.getByText('Registration Complete')).toBeInTheDocument();
  });

  it('renders the body message', () => {
    render(<SuccessModal onClose={() => {}} />);
    expect(screen.getByText(/submitted successfully/i)).toBeInTheDocument();
  });

  it('renders a Done button', () => {
    render(<SuccessModal onClose={() => {}} />);
    expect(screen.getByRole('button', { name: /done/i })).toBeInTheDocument();
  });

  it('calls onClose when Done button is clicked', async () => {
    const handleClose = vi.fn();
    render(<SuccessModal onClose={handleClose} />);
    await userEvent.click(screen.getByRole('button', { name: /done/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', async () => {
    const handleClose = vi.fn();
    const { container } = render(<SuccessModal onClose={handleClose} />);
    await userEvent.click(container.querySelector('.modal-backdrop')!);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when modal card is clicked', async () => {
    const handleClose = vi.fn();
    const { container } = render(<SuccessModal onClose={handleClose} />);
    await userEvent.click(container.querySelector('.modal-card')!);
    expect(handleClose).not.toHaveBeenCalled();
  });
});
