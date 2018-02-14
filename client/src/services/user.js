import * as baseService from './base';

let loggedIn = false;

function getUsers() {
    return baseService.get("/api/users");
}

function isLoggedIn() {
    return loggedIn;
}

function checkLogin() {
    if (loggedIn) {
        return Promise.resolve(true);
    } else {
        baseService.populateAuthToken();
        return me()
            .then((user) => {
                loggedIn = true;
                return Promise.resolve(true);
            }).catch(() => {
                return Promise.resolve(false);
            });
    }
}

function login(email, password) {
    return baseService.makeFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
                    .then((jsonResponse) => {
                        baseService.setAuthToken(jsonResponse.token);
                        loggedIn = true;
                    });
            } else if (response.status === 401) {
                return response.json()
                    .then((jsonResponse) => {
                        throw jsonResponse;
                    });
            }
        });
}

function logout() {
    baseService.clearAuthToken();
    loggedIn = false;
}

function signup(email, password) {
    return baseService.post('/api/users', { email, password })
        .then(() => {
            return true;
        }).catch((err) => {
            console.log(err);
        });
}

function me() {
    return baseService.get('/api/users/me');
}

export { isLoggedIn, checkLogin, login, logout, signup, getUsers };
