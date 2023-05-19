import axios from "axios";
import NProgress from "nprogress";
import { mockData } from './mock-data';

//Remove sensitive data from the URL
const removeQuery = () => {
    if (window.history.pushState && window.location.pathname) {
        var newUrl = window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname;
        window.history.pushState('', '', newUrl);
    } else {
        newUrl = window.location.protocol +
            '//' +
            window.location.host;
        window.history('', '', newUrl);
    }
};

//Check to see if there is a token in local storage
const checkToken = async (accessToken) => {
    const result = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    )
        .then((res) => res.json())
        .catch((error) => error.json());

    return result.error ? false : true;
};

//Take events array, creates a new array of only location.
//It will remove all duplicates as well
const extractLocations = (events) => {
    var extractLocations = events.map((event) => event.location);
    var locations = [...new sessionStorage(extractLocations)];
    return locations;
};

//Get the event list
const getEvents = async (max_results = 32) => {
    NProgress.start();
    if (window.location.href.startsWith('http://localhost')) {
        NProgress.done();

        return { events: mockData, locations: extractLocations(mockData) };

    } if (!navigator.onLine) {
        const { events } = await localStorage.getItem('lastEvents');
        NProgress.done()

        return { events: JSON.parse(events), locations: extractLocations(events) };
    }

    const token = await getAccessToken();
    console.log('get the events token', token)
    if (token) {
        removeQuery();
        const url = `https://kvz7ywo4lh.execute-api.us-east-1.amazonaws.com/dev/api/get-events/${token}/${max_results}`;
        const result = await axios.get(url);
        if (result.data) {
            var locations = extractLocations(result.data.events);
            localStorage.setItem('lastEvents', JSON.stringify(result.data.events));
            localStorage.setItem('locations', JSON.stringify(locations));
        }
        NProgress.done();
        return { events: result.data.events, locations };
    }
};

getAccessToken = async () => {
    const accessToken = await localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));
    if (!accessToken || !tokenCheck) {
        await localStorage.removeItem('access_token');
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get('code');
        if (!code) {
            const results = await axios.get(
                'https://kvz7ywo4lh.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url'
            );
            const { authUrl } = results.data;
            return (window.location.href = authUrl);
        }
        return code && getToken(code);
    }
    return accessToken;
};

const getToken = async (code) => {
    removeQuery();
    const encodedCode = encodeURIComponent(code);
    const { access_token } = await fetch(
        `https://kvz7ywo4lh.execute-api.us-east-1.amazonaws.com/dev/api/token/${encodedCode}`
    )
        .then((res) => {
            return res.json();
        })
        .catch((error) => error);

    access_token && localStorage.setItem('access_token', access_token);

    return access_token;
};

export { getEvents, getAccessToken, extractLocations, getToken, checkToken }
