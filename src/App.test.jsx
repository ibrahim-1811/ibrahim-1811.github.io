import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import App from './App';

it('introduces the engineer with one primary heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Mohammad Ibrahim Memon');
  expect(screen.getByText('Robotics Engineer')).toBeInTheDocument();
});
