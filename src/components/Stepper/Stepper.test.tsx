import { render, screen } from '@testing-library/react';
import Stepper from './Stepper';

describe('Stepper', () => {
  it('renders step label text', () => {
    render(<Stepper current={1} total={3} />);
    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
  });

  it('updates label for current step', () => {
    render(<Stepper current={2} total={3} />);
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
  });

  it('has status role with accessible label', () => {
    render(<Stepper current={2} total={3} />);
    expect(screen.getByRole('status')).toHaveAccessibleName('Step 2 of 3');
  });

  it('renders correct number of dots', () => {
    const { container } = render(<Stepper current={1} total={3} />);
    expect(container.querySelectorAll('.stepper__dot')).toHaveLength(3);
  });

  it('applies active class to current step dot only', () => {
    const { container } = render(<Stepper current={2} total={3} />);
    const dots = container.querySelectorAll('.stepper__dot');
    expect(dots[0]).not.toHaveClass('stepper__dot--active');
    expect(dots[1]).toHaveClass('stepper__dot--active');
    expect(dots[2]).not.toHaveClass('stepper__dot--active');
  });

  it('works with total of 1', () => {
    const { container } = render(<Stepper current={1} total={1} />);
    expect(container.querySelectorAll('.stepper__dot')).toHaveLength(1);
    expect(container.querySelector('.stepper__dot')).toHaveClass('stepper__dot--active');
  });
});
