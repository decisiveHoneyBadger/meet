import { mockData } from './mock-data';
import axios from 'axios';
import NProgress from 'nprogress';

/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};

// checks the token's validity, if a token has been found. If so, it gets the events of the Google Calender API
const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`,
  )
    .then((res) => res.json())
    .catch((error) => error.json());

  return result;
};

export const getEvents = async () => {
  NProgress.start();

  // returns (in getEvents) the mock data, when localhost is used; otherwise the real API
  if (window.location.href.startsWith('http://localhost')) {
    NProgress.done();
    return mockData;
  }
  // if (!navigator.onLine) {
  //   const data = localStorage.getItem('lastEvents');
  //   NProgress.done();
  //   return data ? JSON.parse(events).events : [];
  // }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url =
      'https://7xvruegljh.execute-api.eu-central-1.amazonaws.com/dev/api/get-events' +
      '/' +
      token;
    const result = await axios.get(url);
    if (result.data) {
      var locations = extractLocations(result.data.events);
      localStorage.setItem('lastEvents', JSON.stringify(result.data));
      localStorage.setItem('locations', JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }
};

// gets the access token
export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');

  // retrieves the access token from the Lambda functions on the authorization server. Google will then redirect the user back to the app
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');
    if (!code) {
      const results = await axios.get(
        'https://7xvruegljh.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url',
      );
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};

// removes the code from the URL once It's finished. And checks whether there’s a path, then build the URL with the current path (or build the URL without a path using window.history.pushState()).
const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    var newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname;
    window.history.pushState('', '', newurl);
  } else {
    newurl = window.location.protocol + '//' + window.location.host;
    window.history.pushState('', '', newurl);
  }
};

// When the token is invalid or doesn't exist, it redirects the user to log in with Google so they can be redirected back to your site with the code
const getToken = async (code) => {
  //  takes the code and encodes it using encodeURIComponent, then uses the encoded code to get the token
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    'https://7xvruegljh.execute-api.eu-central-1.amazonaws.com/dev/api/token' +
      '/' +
      encodeCode,
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => error);

  access_token && localStorage.setItem('access_token', access_token);

  return access_token;
};
