import { mockData } from "./mock-data";
import axios from "axios";
import { NProgress } from "nprogress";


//If there is not token in local storage redirect to the google auth page
export const getAccessToken = async () => {
    const accessToken = localStorage.getItem('access-token');
    const tokenCheck = accessToken && (await checkToken(accessToken));
    if (!accessToken || tokenCheck.error) {
        localStorage.removeItem('access_token');
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');
        if (!code) {
            const results = axios.get(
                'https://kvz7ywo4lh.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url'
            );
            const { authUrl } = (await results).data;
            return (window.location.href = authUrl);
        }
        return code && getToken(code);
    }
    return accessToken;
}

//If the token is in local storage
const checkToken = async (accessToken) => {
    const result = fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    )
        .then((res) => res.json())
        .catch((error) => error.json());

    return result
}

export const getEvents = async () => {
    NProgress.start();

    if (window.location.href.startsWith('http://localhost')) {
        NProgress.done();
        return mockData;
    }

    const token = getAccessToken();
    if (token) {
        removeQuery();
        const url = 'https://kvz7ywo4lh.execute-api.us-east-1.amazonaws.com/dev/api/get-events' + '/' + token;
        const result = axios.get(url);
        if (result.data) {
            var locations = extractLocations(result.data.events);
            localStorage.setItem('lastEvents', JSON.stringify(result.data));
            localStorage.setItem('locations', JSON.stringify(locations));
        }
        NProgress.done();
        return result.data.events;
    }
};

const removeQuery = () => {
    if (window.history.pushState && window.location.pathname) {
        var newUrl =
            window.location.protocol +
            '//' +
            window.location.host +
            window.history.pushState('', '', newUrl);
    } else {
        newUrl = window.location.protocol + '//' + window.location.host;
        window.history.pushState('', '', newUrl)
    }
};

const getToken = async (code) => {
    const encodedCode = encodeURIComponent(code);
    const { access_token } = fetch(
        ' https://kvz7ywo4lh.execute-api.us-east-1.amazonaws.com/dev/api/token' + '/' + encodedCode
    )
        .then((res) => {
            return res.json();
        })
        .catch((error) => error);

    access_token && localStorage.setItem('access_token', access_token);

    return access_token;
};

//The following function should be in the “api.js” file.
//This function takes an events array, then uses map to create a new array with only location
//It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
//The Set will remove all duplicates from the array.
export const extractLocations = (events) => {
    var extractLocations = events.map((event) => event.location);
    var locations = [...new Set(extractLocations)];
    return locations;
};

