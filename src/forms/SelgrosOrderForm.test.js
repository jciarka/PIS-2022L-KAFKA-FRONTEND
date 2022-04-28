import { render, screen } from '@testing-library/react';
import SelgrosOrderForm from './SelgrosOrderForm';

test('renders header', () => {
  render(<SelgrosOrderForm />);
  const linkElement = screen.getByText(/New Selgros order/i);
  expect(linkElement).toBeInTheDocument();
});
