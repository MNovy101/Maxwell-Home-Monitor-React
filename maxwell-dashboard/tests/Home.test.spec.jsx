// tests/Home.test.jsx
import { render, screen } from '@testing-library/react';
import App from '../src/App.jsx';

test('renders header', () => {
  render(<App />);
  expect(screen.getByText(/Maxwell Home Energy Monitor/i)).toBeInTheDocument();
});