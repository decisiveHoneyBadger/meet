import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

// the second feature: “It must specify the number of events.”
describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />);
  });

  test('render textbox', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
  });

  test('display number 32 by default', () => {
    expect(
      NumberOfEventsWrapper.find('.number-of-events__input').get(0).props.value,
    ).toEqual(32);
  });

  test('user can change the number of events when the input changes', () => {
    NumberOfEventsWrapper.find('.number-of-events__input').simulate('change', {
      target: { value: 10 },
    });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(10);
  });

  test('only allow number above 1 of events > 0', () => {
    NumberOfEventsWrapper.setState({ numberOfEvents: 32 });
    NumberOfEventsWrapper.find('.number-of-events__input').simulate('change', {
      target: { value: -1 },
    });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(32);
  });

  test('only allow number', () => {
    NumberOfEventsWrapper.setState({ numberOfEvents: 32 });
    NumberOfEventsWrapper.find('.number-of-events__input').simulate('change', {
      target: { value: 32 },
    });
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(32);
  });
});
