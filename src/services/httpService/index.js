import axios from 'axios';

export default {
    get: (url, config = {}) => axios.get(url, config).then(res => res),
    post: (url, data, config = {}) => axios.post(url, data, config).then(res => res),
    put: (url, data, config = {}) => axios.put(url, data, config).then(res => res),
    delete: (url, config = {}) => axios.delete(url, config).then(res => res),
    head: (url, config = {}) => axios.head(url, config).then(res => res),
};
