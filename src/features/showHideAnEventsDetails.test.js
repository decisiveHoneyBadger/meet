import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  let AppWrapper;

  test('An event element is collapsed by default.', ({ given, when, then }) => {
    given('the user is on the main page of the app', () => {
      AppWrapper = mount(<App />);
    });
    when('an event is displayed', () => {});
    then('the event details will be collapsed.', () => {
      expect(AppWrapper.find('.event-details')).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({
    given,
    when,
    then,
  }) => {
    given('the user gets displayed a list of events', async () => {
      AppWrapper = await mount(<App />);
    });
    when('the user clicks on a single event', () => {
      AppWrapper.update();
      AppWrapper.find('.event .btn-details').at(0).simulate('click');
    });
    then('the event details will be collapsed', () => {
      expect(AppWrapper.find('.event .event-details')).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({
    given,
    when,
    then,
  }) => {
    given(
      'the user has clicked on a single event to get its details displayed',
      async () => {
        AppWrapper = await mount(<App />);
        AppWrapper.update();
        AppWrapper.find('.btn-details').at(0).simulate('click');
        expect(AppWrapper.find('.event-details')).toHaveLength(1);
      },
    );
    when('the user clicks on the "hide details" button', () => {
      AppWrapper.find('.btn-details').at(0).simulate('click');
    });
    then('the event details will hide', () => {
      expect(AppWrapper.find('.event-details')).toHaveLength(0);
    });
  });
});
