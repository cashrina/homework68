import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'https://homework68-10e2e-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default axiosApi;