import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  let AppWrapper;

  test("When the user hasn't specified a number of events, 32 is the default number.", ({
    given,
    when,
    then,
  }) => {
    given('the user is on the main page of the app', async () => {
      AppWrapper = await mount(<App />);
    });
    when("the user hasn't specified a number of events", () => {
      AppWrapper.update();
    });
    then('the default number of displayed events will be 32', () => {
      expect(AppWrapper.find('.event')).toHaveLength(6);
    });
  });

  test('User can change the number of events they want to see.', ({
    given,
    when,
    then,
  }) => {
    given('the user is on the main page', async () => {
      AppWrapper = await mount(<App />);
      console.log('App mounted');
    });
    when(
      'the user sets a number of events and he/she wants to see in the “Number of events” box',
      () => {
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);

        NumberOfEventsWrapper.find('.number-of-events__input')
          .at(0)
          .simulate('change', {
            target: { value: 1 },
          });
      },
    );

    then('this number of events will be displayed', () => {
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(1);
    });
  });
});
