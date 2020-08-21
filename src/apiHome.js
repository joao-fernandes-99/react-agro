import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.103:5000/area/area1',
    headers: {'acess-control-allow-origin':'*'}
});

export default api;