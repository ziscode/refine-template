import { AuthProvider } from "@pankod/refine-core";
import decodeJwt from 'jwt-decode';
import axios from "axios";

export const axiosInstance = axios.create();
import { Constants } from './helpers/constants';

export const authProvider: AuthProvider = {
    login: async ({ username, password }) => {

        return fetch(`${Constants.API_URL}/api/login_check`,
            {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            })
            .then(async response => {
                if (response.status === 401) {
                    const res = await response.json();

                    return Promise.reject({ message: res && res.message ? res.message : 'app.errors.invalid_credentials' });
                }

                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }

                return response.json();
            })
            .then(({ token }) => {
                const decodedToken = decodeJwt(token);
                localStorage.setItem(Constants.TOKEN_KEY, token);
                localStorage.setItem(Constants.AUTH_KEY, JSON.stringify(decodedToken));

                return Promise.resolve();
            })
            .catch((e) => {
                throw new Error(e.message ? e.message : 'app.errors.network')
            });

    },

    logout: () => {
        localStorage.removeItem(Constants.TOKEN_KEY);
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
        const token = localStorage.getItem(Constants.TOKEN_KEY);
        if (token) {
            return Promise.resolve();
        }

        return Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
        const token = localStorage.getItem(Constants.TOKEN_KEY);
        const profile = localStorage.getItem(Constants.AUTH_KEY);
        console.log(profile)

        if (!token || !profile) {
            return Promise.reject();
        }

        const { username } = JSON.parse(profile);

        return Promise.resolve({
            id: 1,
            name: username,
            avatar: "https://i.pravatar.cc/150",
        });
    },
    register: ({ name, email, password }) => {
        // We suppose we actually send a request to the back end here.

        if (name && email && password) {
            
            return fetch(`${Constants.API_URL}/register`,
                {
                    method: 'POST',
                    body: JSON.stringify({ name, email, password }),
                    headers: new Headers({ 'Content-Type': 'application/json' }),
                })
                .then(async response => {

                    if (response.status === 400) {
                        const res = await response.json();
                        const children = res.children;
                        let message = "";

                        if (children.email && children.email.errors && children.email.errors.length > 0) {
                            children.email.errors.map((el:any) => message += el.message+'\n');
                        }

                        if (children.name && children.name.errors && children.name.errors.length > 0) {
                            children.name.errors.map((el:any) => message += el.message+'\n');
                        }

                        if (children.password && children.password.errors && children.password.errors.length > 0) {
                            children.password.errors.map((el:any) => message += el.message+'\n');
                        }
                        
                        return Promise.reject({message:message});    
                    } else if (response.status < 200 || response.status >= 300) {
                        const res = await response.json();                        

                        return Promise.reject({ message: res && res.message ? res.message : 'app.errors.registration_error' });
                    }

                    return response.json();
                })
                .then((values:any) => {
                    return Promise.resolve(values);
                })
                .catch((e) => {
                    throw new Error(e.message ? e.message : 'app.errors.network')
                });

        }

        return Promise.reject();
    },

    forgotPassword: ({ email }) => {
        // We suppose we actually send a request to the back end here.
        if (email) {
            
            return fetch(`${Constants.API_URL}/reset-password`,
                {
                    method: 'POST',
                    body: JSON.stringify({ email }),
                    headers: new Headers({ 'Content-Type': 'application/json' }),
                })
                .then(async response => {
                    if (response.status === 400) {
                        const res = await response.json();
                        const children = res.children;
                        let message = "";

                        if (children.email && children.email.errors && children.email.errors.length > 0) {
                            children.email.errors.map((el:any) => message += el.message+'\n');
                        }

                        return Promise.reject({message:message});    
                    } else if (response.status < 200 || response.status >= 300) {
                        const res = await response.json();                        

                        return Promise.reject({ message: res && res.message ? res.message : 'app.errors.forgot_password_error' });
                    }

                    return response.json();
                })
                .then((values) => {
                    return Promise.resolve(values);
                })
                .catch((e) => {
                    throw new Error(e.message ? e.message : 'app.errors.network')
                });

        }
        return Promise.reject();
    },
    updatePassword: ({ newPassword, repeatePassword, token }) => {
        // If you want to get token the query params from the url, you can use `queryStrings`.
        if (newPassword && repeatePassword && token) {

            const attr = {
                plainPassword: {
                    first: newPassword,
                    second: repeatePassword
                }
            }

            return fetch(`${Constants.API_URL}/reset-password/reset/${token}`,
                {
                    method: 'POST',
                    body: JSON.stringify(attr),
                    headers: new Headers({ 'Content-Type': 'application/json' }),
                })
                .then(async response => {
                    if (response.status === 400) {
                        const res = await response.json();

                        if (res.message) {
                            return Promise.reject({message:res.message});    
                        }

                        const errors = res?.children?.plainPassword?.children?.first?.errors;
                        let message = "";

                        if (errors && errors.length > 0) {
                            errors.map((el:any) => message += el.message+'\n');
                        }

                        return Promise.reject({message:message});    
                    } else if (response.status < 200 || response.status >= 300) {
                        const res = await response.json();                        

                        return Promise.reject({ message: res && res.message ? res.message : 'app.errors.reset_password_error' });
                    }

                    return response.json();
                })
                .then((values) => {
                    return Promise.resolve(values);
                })
                .catch((e) => {
                    throw new Error(e.message ? e.message : 'app.errors.network')
                });
        }
        return Promise.reject();
    },
};
