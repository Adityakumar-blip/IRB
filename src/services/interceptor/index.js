import axios from 'axios';
import { doIfUserIsUnauthorized, getToken, getAsyncStorage } from '../../utils/customFunctions';

export default {
    setupInterceptors: async () => {
        await axios.interceptors.request.use(
            async config => {
                const configuration = config;
                if (configuration.url.indexOf('upload') > -1) {
                    configuration.headers['Content-Type'] = 'multipart/form-data'; // eslint-disable-line
                } else {
                    configuration.headers['Content-Type'] = 'application/json'; // eslint-disable-line
                }
                const token = await JSON.parse(await getAsyncStorage('Token'));

                if (token) config.headers['x-access-token'] = `${token}`;
                return config;

                // if (configuration.url.indexOf('upload') > -1) {
                //     configuration.headers['Content-Type'] = 'multipart/form-data'; // eslint-disable-line
                // } else {
                //     configuration.headers['Content-Type'] = 'application/json'; // eslint-disable-line
                // }
                //const token = await JSON.parse(await getAsyncStorage('Token'));
                // config.headers['Content-Type'] = 'application/json';
                // if (token) {
                //     config.headers.Authorization = `${token.token_type || 'Bearer'} ${token.access_token}`;
                // }
                // if (token) {
                //     config.headers['x-access-token'] = `${token}`;
                // }
                // return config;
            },
            error => {
                Promise.reject(error);
            },
        );

        await axios.interceptors.response.use(
            response => {
                return response;
            },
            async error => {
                const data = await error.response;
                if (data && (data.status === 401 || data.statusText === 'Unauthorized')) {
                    doIfUserIsUnauthorized();
                    return Promise.reject(error.response.data);
                }
                return Promise.reject(error);
            },
        );
    },
};
