import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TopicCard from './TopicCard';

describe('TopicCard', () => {
  it('renders label text', () => {
    render(<TopicCard label="User Experience" selected={false} onClick={() => {}} />);
    expect(screen.getByText('User Experience')).toBeInTheDocument();
  });

  it('is a button element', () => {
    render(<TopicCard label="Design" selected={false} onClick={() => {}} />);
    expect(screen.getByRole('button', { name: 'Design' })).toBeInTheDocument();
  });

  it('sets aria-pressed to false when not selected', () => {
    render(<TopicCard label="Design" selected={false} onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('sets aria-pressed to true when selected', () => {
    render(<TopicCard label="Design" selected={true} onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('applies selected class when selected', () => {
    render(<TopicCard label="Design" selected={true} onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveClass('topic-card--selected');
  });

  it('does not apply selected class when not selected', () => {
    render(<TopicCard label="Design" selected={false} onClick={() => {}} />);
    expect(screen.getByRole('button')).not.toHaveClass('topic-card--selected');
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<TopicCard label="Design" selected={false} onClick={handleClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
