import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders CitySearch', () => {
  const AppWrapper = shallow(<App />);
  expect(AppWrapper.find(CitySearch)).toHaveLength(1);
});

test('renders the number of events', () => {
  const NumberOfEvents = shallow(<App />);
  expect(NumberOfEvents.find(CitySearch)).toHaveLength(1);
});
