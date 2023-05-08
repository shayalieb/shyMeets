// import { mockData } from './mock-data';
// import axios from "axios";
// import NProgress from "nprogress";

// export const getAccessToken = async () => {
//     const accessToken = localStorage.getItem('access_token')
//     const tokenCheck = accessToken && (await tokenCheck(accessToken));
//     if (!accessToken || tokenCheck.error) {
//         await localStorage.removeItem('access_token');
//         const searchParams = new URLSearchParams(window.location.search);
//         const code = await searchParams.get('code');
//         if (!code) {
//             const result = await axios.get(
//                 'https://kvz7ywo4lh.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url'
//             );
//             const { authUrl } = result.data;
//             return (window.location.href = authUrl);
//         }
//         return code && getAccessToken(code);
//     }
//     return accessToken
// };

// export const getEvents = async () => {
//     NProgress.start();

//     if (window.location.href.startsWith('http://localhost')) {
//         NProgress.done();
//         return mockData;
//     }

//     if (!navigator.onLine) {
//         const data = localStorage.getItem('lastEvents');
//         NProgress.done();
//         return data ? JSON.parse(data).events : [];
//     }

//     const token = await getAccessToken()
//     if (token) {
//         removeQuery();
//         const url = 'https://kvz7ywo4lh.execute-api.us-east-1.amazonaws.com/dev/api/get-events' + '/' + token;
//         const result = await axios.get(url);
//         if (result.data) {
//             var locations = extractLocations(result.data.events);
//             localStorage.setItem('lastEvents', JSON.stringify(result.data));
//             localStorage.setItem('locations', JSON.stringify(locations));
//         }
//         NProgress.done();
//         return result.data.events;
//     }
// }

// const removeQuery = () => {
//     if (window.history.pushState && window.location.pathname) {
//         var newUrl =
//             window.location.protocol +
//             '//' +
//             window.location.host +
//             window.location.pathname;
//         window.history.pushState('', '', newUrl)
//     } else {
//         newUrl = window.location.protocol + '//' + window.location.host;
//         window.history.pushState('', '', newUrl);
//     }
// };

// export const getToken = async (code) => {
//     try {
//         const encodedCode = encodeURIComponent(code);
//         const response = await fetch(
//             'https://kvz7ywo4lh.execute-api.us-east-1.amazonaws.com/dev/api/token' + '/' + encodedCode
//         );
//         if (!response.ok) {
//             throw new Error(`HTTP Error! status ${response.status}`);
//         }
//         const { access_token } = await response.json();
//         access_token && localStorage.setItem('access_token', access_token);
//         return access_token;
//     } catch (error) {
//         error.json();
//     }
// };

// export const extractLocations = (events) => {
//     var extractLocations = events.map((event) => event.location);
//     var locations = [...new Set(extractLocations)];
//     return locations;
// };

// export const getAccessToken = async () => {
//         const accessToken = localStorage.getItem('access_token');
//         const tokenCheck = accessToken && (await checkToken(accessToken));
//         if (!accessToken || tokenCheck.error) {
//             await localStorage.removeItem('access_token');
//             const searchParams = new URLSearchParams(window.location.search);
//             const code = await searchParams.get('code');
//             if (!code) {
//                 const results = await axios.get(
//                     'https://kvz7ywo4lh.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url'
//                 );
//                 const { authUrl } = results.data;
//                 return (window.location.href = authUrl);
//             }
//             return code && getToken(code);
//         }
//         return accessToken;
//     }


import axios from "axios";
import NProgress from "nprogress";
import { mockData } from "./mock-data";

export const getAccessToken = async () => {
    const accessToken = localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));
    if (!accessToken || tokenCheck.error) {
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
}


export const isLoggedIn = () => {
    const accessToken = localStorage.getItem('access_token');
    const tokenCheck = accessToken && (checkToken(accessToken));
    if (accessToken && !tokenCheck.error) {
        return true;
    }
    return false;
}

export const checkToken = async (accessToken) => {
    const result = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    )
        .then((res) => res.json())
        .catch((error) => error.json());
    return result;
};

export const getEvents = async () => {
    NProgress.start();

    if (window.location.href.startsWith('http://localhost')) {
        NProgress.done();
        return mockData;
    };

    if (!navigator.onLine) {
        const data = localStorage.getItem('lastEvents');
        NProgress.done();
        return data ? JSON.parse(data).events : [];
    }

    const token = await getAccessToken();
    if (token) {
        removeQuery();
        const url = 'https://kvz7ywo4lh.execute-api.us-east-1.amazonaws.com/dev/api/get-events' + '/' + token;
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

export const extractLocations = (events) => {
    var extractLocations = events.filter(event => event.location).map((event) => event.location);
    var locations = [...new Set(extractLocations)];
    return locations;
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
        window.history.pushState('', '', newUrl);
    }
};

const getToken = async (code) => {
    try {
        const encodedCode = encodeURIComponent(code);
        const response = await fetch(
            'https://kvz7ywo4lh.execute-api.us-east-1.amazonaws.com/dev/api/token' + '/' + encodedCode
        )
        if (!response.ok) {
            throw new Error(`HTTP Error! status: ${response.status}`)
        }
        const { access_token } = await response.json();
        access_token && localStorage.setItem('access_token', access_token);
        return access_token;
    } catch (error) {
        error.json();
    }
};