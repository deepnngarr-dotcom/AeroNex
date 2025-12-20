// client/src/utils/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Pointing to your new Port 8000
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;