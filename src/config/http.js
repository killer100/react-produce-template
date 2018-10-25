import axios from 'axios';

export const RegisterInterceptors = (beforeSend, beforeResponse) => {
    // Add a request interceptor
    axios.interceptors.request.use(
        function(config) {
            beforeSend();
            // Do something before request is sent
            return config;
        },
        function(error) {
            // Do something with request error
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    axios.interceptors.response.use(
        function(response) {
            beforeResponse();
            // Do something with response data
            return response;
        },
        function(error) {
            beforeResponse();
            // Do something with response error
            return Promise.reject(error);
        }
    );
};
