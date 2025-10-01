import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    timeout: 30000, // 30 seconds timeout for bulk operations
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for logging
api.interceptors.request.use(
    (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        console.log(`API Response: ${response.status} ${response.config.url}`);
        return response;
    },
    (error) => {
        console.error('API Response Error:', error);

        // Handle network errors
        if (!error.response) {
            throw new Error('Network error. Please check your connection and try again.');
        }

        // Handle HTTP errors
        const status = error.response.status;
        const message = error.response.data?.error || error.message;

        switch (status) {
            case 400:
                throw new Error(`Bad Request: ${message}`);
            case 401:
                throw new Error('Unauthorized. Please check your API credentials.');
            case 403:
                throw new Error('Forbidden. You do not have permission to perform this action.');
            case 404:
                throw new Error('API endpoint not found. Please check the server configuration.');
            case 429:
                throw new Error('Too many requests. Please wait before trying again.');
            case 500:
                throw new Error('Internal server error. Please try again later.');
            case 502:
                throw new Error('Bad gateway. The server is temporarily unavailable.');
            case 503:
                throw new Error('Service unavailable. Please try again later.');
            default:
                throw new Error(`Request failed with status ${status}: ${message}`);
        }
    }
);

// API functions
export const getCountries = async () => {
    try {
        const response = await api.get('/countries');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch countries:', error);
        throw error;
    }
};

export const sendBulkMessages = async (formData, onProgress) => {
    try {
        // Create a custom axios instance for this request to handle progress
        const response = await api.post('/send-messages', formData, {
            onUploadProgress: (progressEvent) => {
                // This is for file uploads, but we can use it to track request progress
                if (onProgress && progressEvent.total) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgress(percentCompleted, 100);
                }
            },
        });

        return response.data;
    } catch (error) {
        console.error('Failed to send bulk messages:', error);
        throw error;
    }
};

// Health check function
export const checkServerHealth = async () => {
    try {
        const response = await api.get('/health');
        return response.data;
    } catch (error) {
        console.error('Server health check failed:', error);
        throw error;
    }
};

// Utility function to validate phone number format
export const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber.replace(/\s/g, ''));
};

// Utility function to format phone number for display
export const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';

    // Remove all non-digit characters except +
    let cleaned = phoneNumber.replace(/[^\d+]/g, '');

    // Ensure it starts with + if it doesn't already
    if (cleaned && !cleaned.startsWith('+')) {
        cleaned = '+' + cleaned;
    }

    return cleaned;
};

// Utility function to get country dial code
export const getCountryDialCode = (countryCode, countries) => {
    const country = countries.find(c => c.code === countryCode);
    return country ? country.dialCode : '';
};

// Utility function to estimate sending time
export const estimateSendingTime = (counter, delay) => {
    if (counter <= 1) return 0;
    return (counter - 1) * delay;
};

export default api;
