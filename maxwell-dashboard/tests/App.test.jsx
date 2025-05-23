// tests/App.test.jsx
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import '@testing-library/jest-dom';

jest.mock('../src/firebase', () => ({
  database: jest.fn(),
}));

jest.mock('../src/components/GraphView', () => () => <div data-testid="graph-view">GraphView Loaded</div>);
jest.mock('../src/components/OverThresholdList', () => () => <div data-testid="over-threshold-list">OverThresholdList Loaded</div>);

describe('App Component', () => {
  test('renders header and both tab components', () => {
    render(<App />);

    expect(screen.getByText(/Maxwell Home Energy Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Real-time monitoring of household energy metrics/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Recent Data/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Alerts/i })).toBeInTheDocument();

    expect(screen.getByTestId('graph-view')).toBeInTheDocument();
  });
});
