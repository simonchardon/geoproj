import React from 'react';
import { render } from '@testing-library/react';
import Person from './components/person';

test('renders learn react link', () => {
  const { getByText } = render(<Person />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
