import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Step3 from './Step3';

const defaultProps = {
  name: 'Alice',
  email: 'alice@example.com',
  topics: ['User Experience', 'Graphic Design'],
  onConfirm: vi.fn(),
};

describe('Step3', () => {
  it('renders the Summary heading', () => {
    render(<Step3 {...defaultProps} />);
    expect(screen.getByText('Summary')).toBeInTheDocument();
  });

  it('displays the name', () => {
    render(<Step3 {...defaultProps} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('displays the email', () => {
    render(<Step3 {...defaultProps} />);
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
  });

  it('displays all topics', () => {
    render(<Step3 {...defaultProps} />);
    expect(screen.getByText('User Experience')).toBeInTheDocument();
    expect(screen.getByText('Graphic Design')).toBeInTheDocument();
  });

  it('renders a topic list item for each topic', () => {
    render(<Step3 {...defaultProps} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('calls onConfirm when Continue is clicked', async () => {
    const onConfirm = vi.fn();
    render(<Step3 {...defaultProps} onConfirm={onConfirm} />);
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('renders empty topic list when no topics provided', () => {
    render(<Step3 {...defaultProps} topics={[]} />);
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
